import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import NoteList from "./components/notes/NoteList";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { fetchNotes, deleteNote, updateNote } from "./api/notes";
import { useAuth } from "./context/AuthContext";

function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const { accessToken } = useAuth();
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
        />
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
