const BASE_URL = "http://localhost:3000/api/notes";

async function fetchNotes(accessToken) {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

async function createNote(note, accessToken) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(note),
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Failed to save note");
  }

  return res.json();
}

async function deleteNote(id, accessToken) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Delete failed");
}

async function updateNote(id, data, accessToken) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}
export { fetchNotes, createNote, deleteNote, updateNote };
