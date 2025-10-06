import React, { useState } from "react";
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

    try {
      await createNote(note, accessToken);

      props.refreshNotes(accessToken);

      setNote({ title: "", content: "" });
    } catch (error) {
      console.error("X Errror:", error.message);
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
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
    </div>
  );
}

export default CreateArea;
