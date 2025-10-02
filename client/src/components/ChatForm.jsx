import { useRef } from "react";

function ChatForm({ setChatHistory }) {
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

    //add a "Thinking..." message placeholder for the bot's response
    setTimeout(
      () =>
        setChatHistory((history) => [
          ...history,
          { role: "model", text: "Thinking..." },
        ]),
      600
    );
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
