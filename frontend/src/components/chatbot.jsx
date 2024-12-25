// import React, { useState } from "react";
// import axios from "axios";
// import "../components/chatbot.css"; // Ensure this path is correct for your CSS file

// const Chatbot = () => {
//   const [userMessage, setUserMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Add the user's message to the chat history
//     setChatHistory([...chatHistory, { message: userMessage, sender: "user" }]);

//     try {
//       // Log the user's message to console for debugging
//       console.log("Sending message: ", userMessage);

//       // Make a POST request to the backend /chatbot endpoint
//       const response = await axios.post("http://localhost:4000/chatbot", {
//         message: userMessage,
//         sessionId: "unique-session-id", // You can generate or hardcode a session ID
//       });

//       // Log the response for debugging
//       console.log("Bot's response: ", response.data);

//       // Add the bot's reply to the chat history
//       setChatHistory([
//         ...chatHistory,
//         { message: userMessage, sender: "user" },
//         { message: response.data.reply, sender: "bot" },
//       ]);

//       // Clear the input field after sending the message
//       setUserMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         <div className="chat-history">
//           {chatHistory.map((chat, index) => (
//             <div
//               key={index}
//               className={`chat-message ${
//                 chat.sender === "user" ? "user-message" : "bot-message"
//               }`}
//             >
//               <p>{chat.message}</p>
//             </div>
//           ))}
//         </div>

//         <form className="chat-input-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={userMessage}
//             onChange={(e) => setUserMessage(e.target.value)}
//             placeholder="Ask a question..."
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
