import { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { chatbotPrompt, chatbotFirstMessage } from "./chatbotConfig";

function Chatbot({
  showChat,
  setShowChat,
  chatHistory,
  setChatHistory,
  pendingBotResponse,
  setPendingBotResponse,
}) {
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    //helper function to update chat history
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

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

      //clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      //auto-scroll whenever chat history updates
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  useEffect(() => {
    if (!pendingBotResponse) return;

    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage?.role === "user") {
      setChatHistory((prev) => [
        ...prev,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse(chatHistory);
      setPendingBotResponse(false);
    }
  }, [chatHistory, pendingBotResponse]);

  return (
    <div className={`chat-container ${showChat ? "show-chat" : ""}`}>
      {/* toggling the showChat value on the button click */}
      <button onClick={() => setShowChat((prev) => !prev)} id="chatbot-toggler">
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chat-popup">
        {/* chat header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <ChatbotIcon />
            <h2 className="icon-text">Keeper Bot</h2>
          </div>
          <button
            onClick={() => setShowChat((prev) => !prev)}
            className="material-symbols-outlined"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* chat body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">{chatbotFirstMessage}</p>
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
