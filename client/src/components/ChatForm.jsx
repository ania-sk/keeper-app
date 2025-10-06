import { useRef } from "react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const chatInputRef = useRef();
  const handleChatFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;
    chatInputRef.current.value = "";

    // update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    //delay 600ms before showing "Thinking..." and generating response
    setTimeout(() => {
      //add a "Thinking..." message placeholder for the bot's response
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      //call the function to generate the bot's response
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
        placeholder="Message..."
        className="message-input"
        required
      />
      <button>
        <ArrowUpwardRoundedIcon />
      </button>
    </form>
  );
}

export default ChatForm;
