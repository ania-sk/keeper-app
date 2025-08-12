import Note from "./Note";

function NoteList({ notes, onDelete, onUpdate }) {
  return (
    <>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
}

export default NoteList;
