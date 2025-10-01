import { useRef } from "react";

function ChatForm() {
  const chatInputRef = useRef();
  const handleChatFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = chatInputRef.current.value.trim();
    if (!userMessage) return;
    chatInputRef.current.value = "";

    console.log(userMessage);
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
      <button className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
}

export default ChatForm;
