import { useState } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
function Chatbot() {
  const [chatHistory, setChatHistory] = useState();
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
          <div className="message user-message">
            <p className="message-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
              cupiditate natus quaerat aspernatur ad ratione quae itaque eos
            </p>
          </div>
        </div>

        {/* chat footer */}
        <div className="chat-footer">
          <ChatForm setChatHistory={setChatHistory} />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
