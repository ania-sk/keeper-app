import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const navigate = useNavigate();
  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  async function handleSave() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note.");
      }

      const updatedNote = await response.json();
      props.onUpdate(updatedNote);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit error:", error);
    }
  }

  return isEditing ? (
    <div className="note edit">
      <input
        value={editedTitle ?? ""}
        onChange={(event) => setEditedTitle(event.target.value)}
      />
      <textarea
        value={editedContent ?? ""}
        onChange={(event) => setEditedContent(event.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  ) : (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
