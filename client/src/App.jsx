import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import NoteList from "./components/notes/NoteList";
import Footer from "./components/Footer";
import { fetchNotes, deleteNote, updateNote } from "./api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // Pobierz notatki po załadowaniu komponentu
  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const accessToken = localStorage.getItem("accessToken");

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
    const accessToken = localStorage.getItem("accessToken");
    try {
      await deleteNote(id, accessToken);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch {
      navigate("/login");
    }
  }

  async function handleUpdate(updatedNote) {
    const accessToken = localStorage.getItem("accessToken");
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
    <div>
      <Header />
      <CreateArea refreshNotes={loadNotes} />
      <NoteList notes={notes} onDelete={handleDelete} onUpdate={handleUpdate} />
      <Footer />
    </div>
  );
}

export default App;
