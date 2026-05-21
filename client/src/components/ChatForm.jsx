import { useRef } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

function ChatForm({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  disabled,
}) {
  const chatInputRef = useRef();

  const handleChatFormSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;

    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;
    chatInputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleChatFormSubmit}>
      <input
        ref={chatInputRef}
        type="text"
        placeholder={
          disabled ? "Accept the notice above to chat..." : "Message..."
        }
        className="message-input"
        required
        disabled={disabled}
      />
      <button disabled={disabled}>
        <ArrowUpwardRoundedIcon />
      </button>
    </form>
  );
}

export default ChatForm;
