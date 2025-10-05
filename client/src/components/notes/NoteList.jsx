import Note from "./Note";

function NoteList({ notes, onDelete, onUpdate, onAskChatbot }) {
  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onAskChatbot={onAskChatbot}
        />
      ))}
    </>
  );
}

export default NoteList;
