import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateNote } from "../../api/notes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
import ChatbotIcon from "../ChatbotIcon";
import ConfirmModal from "../ConfirmModal";

function Note({ note, onDelete, onUpdate, onAskChatbot }) {
  const { id, title, content } = note;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title ?? "");
  const [editedContent, setEditedContent] = useState(content ?? "");
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const titleInputRef = useRef(null);
  const noteRef = useRef(null);
  const [noteHeight, setNoteHeight] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  function handleEdit() {
    if (noteRef.current) {
      const { height } = noteRef.current.getBoundingClientRect();
      setNoteHeight(height);
    }
    setIsEditing(true);
  }

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

  function handleAskChatbot() {
    if (!isEditing) {
      onAskChatbot(title, content);
    }
  }

  return isEditing ? (
    <div
      className="note edit"
      ref={noteRef}
      style={{ height: `${noteHeight}px` }}
    >
      <input
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        ref={titleInputRef}
      />
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      />
      <div>
        <button onClick={handleSave}>
          <CheckIcon className="edit-icon" />
        </button>
        <button onClick={() => setIsEditing(false)}>
          <CloseIcon className="edit-icon" />
        </button>
      </div>
    </div>
  ) : (
    <div ref={noteRef} className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => setShowConfirmModal(true)}>
        <DeleteIcon />
      </button>
      <button onClick={handleEdit}>
        <EditIcon />
      </button>
      <button onClick={handleAskChatbot} className="chat-note-btn">
        <ChatbotIcon />
      </button>
      {showConfirmModal && (
        <ConfirmModal
          message="Do you want to delete the note?"
          onConfirm={() => {
            onDelete(id);
            setShowConfirmModal(false);
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}

export default Note;
