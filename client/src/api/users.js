const BASE_URL = import.meta.env.VITE_AUTH_URL;

// GDPR Art. 17 — Right to erasure
async function deleteAccount(accessToken) {
  const res = await fetch(`${BASE_URL}/account`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Account deletion failed");
  }

  return res.json();
}

// GDPR Art. 20 — Right to data portability
async function exportAccountData(accessToken) {
  const res = await fetch(`${BASE_URL}/account/export`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Data export failed");
  }

  // trigger browser file download
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "keeper-data-export.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export { deleteAccount, exportAccountData };
