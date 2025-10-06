import React, { useState, useRef, useEffect } from "react";
import { createNote } from "../api/notes";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const { accessToken } = useAuth();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const formRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  async function submitNote(event) {
    event.preventDefault();

    //do not add an empty note
    if (!note.title.trim() && !note.content.trim()) {
      setError("The note cannot be empty.");
      return;
    }

    try {
      await createNote(note, accessToken);

      props.refreshNotes(accessToken);

      setNote({ title: "", content: "" });
      setExpanded(false);
      setError("");
    } catch (error) {
      console.error("X Errror:", error.message);
    }
  }

  function expand() {
    setExpanded(true);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        isExpanded &&
        !note.title.trim() &&
        !note.content.trim()
      ) {
        setExpanded(false);
        setError("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, note]);

  return (
    <div>
      <form className="create-note" ref={formRef}>
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote} className="tooltip-btn">
            <AddIcon />
            <span className="tooltip-text">Add new note</span>
          </Fab>
        </Zoom>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CreateArea;
