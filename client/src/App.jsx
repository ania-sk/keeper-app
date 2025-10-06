import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import NoteList from "./components/notes/NoteList";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { fetchNotes, deleteNote, updateNote } from "./api/notes";
import { useAuth } from "./context/AuthContext";
import { chatbotPrompt } from "./components/chatbotConfig";

function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [pendingBotResponse, setPendingBotResponse] = useState(false);

  function handleAskChatbot(title, content) {
    const filledPrompt = chatbotPrompt
      .replace("{{title}}", title || "no specific title")
      .replace("{{content}}", content || "no specific content");
    setChatHistory((prev) => [
      ...prev,
      {
        hideInChat: true,
        role: "model",
        text: filledPrompt,
      },
      {
        role: "user",
        text: `Title: ${title}\nDescription: ${content}`,
      },
    ]);
    setPendingBotResponse(true);
    setShowChat(true);
  }

  // Pobierz notatki po załadowaniu komponentu
  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    try {
      const data = await fetchNotes(accessToken);
      setNotes(data);
    } catch {
      navigate("/login");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteNote(id, accessToken);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch {
      navigate("/login");
    }
  }

  async function handleUpdate(updatedNote) {
    try {
      await updateNote(updatedNote.id, updatedNote, accessToken);
      setNotes((prev) =>
        prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    } catch {
      navigate("/login");
    }
  }

  return (
    <div className="container">
      <Header />
      <CreateArea refreshNotes={loadNotes} />
      <div className="notes-box">
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onAskChatbot={handleAskChatbot}
        />
      </div>
      <Chatbot
        showChat={showChat}
        setShowChat={setShowChat}
        chatHistory={chatHistory}
        setChatHistory={setChatHistory}
        pendingBotResponse={pendingBotResponse}
        setPendingBotResponse={setPendingBotResponse}
      />

      <Footer />
    </div>
  );
}

export default App;
