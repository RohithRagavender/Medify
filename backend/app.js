

//-------------------Twilio Experiment code----------

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import twilio from "twilio";

const app = express();
config({ path: ".env" });

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);

app.use(
  cors({
    origin: ["https://hoszi.netlify.app", "https://hoszi-dashboard.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Registering Routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Twilio Reminder Route
app.post("/api/v1/send-reminder", async (req, res) => {
  let { phone, appointmentDate } = req.body;

  // Basic validation for 10-digit Indian numbers
  if (!phone || !phone.match(/^\d{10}$/)) {
    return res.status(400).json({ message: "Invalid phone number format. Use a 10-digit number like 6379851657." });
  }

  // Add the +91 country code for Indian numbers
  phone = `+91${phone}`;

  try {
    const message = `Reminder: You have an appointment scheduled on ${appointmentDate}. Please arrive 30 minutes early.`;
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio verified phone number
      to: phone,
    });

    res.status(200).json({ message: "Reminder sent successfully", sms });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ message: "Failed to send reminder", error: error.message });
  }
});


// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;


