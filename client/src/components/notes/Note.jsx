import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateNote } from "../../api/notes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";

function Note({ note, onDelete, onUpdate }) {
  const { id, title, content } = note;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title ?? "");
  const [editedContent, setEditedContent] = useState(content ?? "");
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  async function handleSave() {
    if (!accessToken) return navigate("/login");

    try {
      const updated = await updateNote(
        id,
        {
          title: editedTitle,
          content: editedContent,
        },
        accessToken
      );
      onUpdate(updated);
      setIsEditing(false);
    } catch {
      navigate("/login");
    }
  }

  return isEditing ? (
    <div className="note edit">
      <input
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <button onClick={handleSave}>
        <CheckIcon className="edit-icon" />
      </button>
      <button onClick={() => setIsEditing(false)}>
        <CloseIcon className="edit-icon" />
      </button>
    </div>
  ) : (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => onDelete(id)}>
        <DeleteIcon />
      </button>
      <button onClick={() => setIsEditing(true)}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
