// import app from "./app.js";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server listening at port ${process.env.PORT}`);
// });














import app from "./app.js"; // Import your existing Express app
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import dialogflow from "@google-cloud/dialogflow";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file's directory using import.meta.url (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Middleware
app.use(bodyParser.json());

// Set up Dialogflow Client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: path.join(__dirname, "config", "service-account.json"), // Correct path
});

const projectId = "chat-bot-9rhh"; // Replace with your Dialogflow project ID

// Function to handle Dialogflow responses
const handleDialogflowQuery = async (userMessage, sessionId = "default-session") => {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: "en",
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    return result;
  } catch (error) {
    throw new Error("Error processing chatbot query: " + error.message);
  }
};

// Chatbot Endpoint
app.post("/chatbot", async (req, res) => {
  const sessionId = req.body.sessionId || "default-session";
  const userMessage = req.body.message;

  try {
    const result = await handleDialogflowQuery(userMessage, sessionId);

    // Custom Logic for Intent Handling
    if (result.intent.displayName === "DoctorAvailability") {
      const doctorName = result.parameters.fields["doctor-name"].stringValue;
      const availability = "Monday and Wednesday"; // Replace with database query logic
      res.json({ reply: `Dr. ${doctorName} is available on ${availability}` });
    } else if (result.intent.displayName === "AppointmentBooking") {
      const date = result.parameters.fields["date"].stringValue;
      const time = result.parameters.fields["time"].stringValue;
      res.json({ reply: `Your appointment is booked for ${date} at ${time}.` });
    } else {
      res.json({ reply: result.fulfillmentText });
    }
  } catch (error) {
    console.error("Error in chatbot endpoint:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
} );
