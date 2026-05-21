import { useRef, useEffect, useState } from "react";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { getChatbotFirstMessage } from "./chatbotConfig";
import { useAuth } from "../context/AuthContext";

const GROQ_NOTICE_KEY = "groq_notice_accepted";

function Chatbot({
  showChat,
  setShowChat,
  chatHistory,
  setChatHistory,
  pendingBotResponse,
  setPendingBotResponse,
}) {
  const chatBodyRef = useRef();
  const { userName } = useAuth();
  const [groqNoticeAccepted, setGroqNoticeAccepted] = useState(
    () => localStorage.getItem(GROQ_NOTICE_KEY) === "true",
  );

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text, isError },
      ]);
    };

    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions,
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong!");

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

  function handleAcceptGroqNotice() {
    localStorage.setItem(GROQ_NOTICE_KEY, "true");
    setGroqNoticeAccepted(true);
  }

  return (
    <div className={`chat-container ${showChat ? "show-chat" : ""}`}>
      <button onClick={() => setShowChat((prev) => !prev)} id="chatbot-toggler">
        <ChatBubbleRoundedIcon className="toggler-icon" />
        <CloseRoundedIcon className="toggler-icon" />
      </button>

      <div className="chat-popup">
        <div className="chat-header">
          <div className="chat-header-info">
            <ChatbotIcon />
            <h2 className="icon-text">Keeper Bot</h2>
          </div>
          <button onClick={() => setShowChat((prev) => !prev)}>
            <KeyboardArrowDownRoundedIcon />
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          {!groqNoticeAccepted ? (
            <div className="groq-notice">
              <div className="groq-notice-icon">🔒</div>
              <p className="groq-notice-title">Before you start chatting</p>
              <p className="groq-notice-text">
                Keeper Bot is powered by <strong>Groq AI</strong>. Your messages
                and note contents sent to the chatbot are processed by Groq's
                servers, which may be located outside the EU (USA).
              </p>
              <p className="groq-notice-text">
                By using the chatbot, you consent to this data transfer in
                accordance with our{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <button
                className="groq-notice-btn"
                onClick={handleAcceptGroqNotice}
              >
                I understand, continue
              </button>
            </div>
          ) : (
            <>
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text">
                  {getChatbotFirstMessage(userName)}
                </p>
              </div>

              {chatHistory.map((chat, index) => (
                <ChatMessage key={index} chat={chat} />
              ))}
            </>
          )}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
            disabled={!groqNoticeAccepted}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
