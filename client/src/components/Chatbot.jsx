import { useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);

  const generateBotResponse = async (history) => {
    //format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      //make the API call to get the bot's response
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-popup">
        {/* chat header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <ChatbotIcon />
            <h2 className="icon-text">Keeper Bot</h2>
          </div>
          <button className="material-symbols-outlined">
            keyboard_arrow_down
          </button>
        </div>

        {/* chat body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Haro, haro! <br />
              Jakoś pomóc?
            </p>
          </div>

          {/* render the chat history dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* chat footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
