import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteAccount, exportAccountData } from "../api/users";
import Header from "./Header";
import Footer from "./Footer";

function AccountSettings() {
  const { accessToken, logout, userName } = useAuth();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleExport() {
    setExportLoading(true);
    setMessage("");
    try {
      await exportAccountData(accessToken);
      setMessage("Your data has been downloaded.");
    } catch (err) {
      setMessage(err.message || "Export failed. Please try again.");
    } finally {
      setExportLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setDeleteLoading(true);
    setMessage("");
    try {
      await deleteAccount(accessToken);
      logout();
      navigate("/login");
    } catch (err) {
      setMessage(err.message || "Deletion failed. Please try again.");
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="legal-page">
        <div className="legal-container">
          <h1>Account Settings</h1>
          <span className="legal-updated">Logged in as: {userName}</span>

          <h2>Your Data</h2>

          <div className="account-actions">
            {/* Art. 20 — Data portability */}
            <div className="account-action-card">
              <h3>📦 Export your data</h3>
              <p>
                Download a copy of all your personal data — account info and
                notes — in JSON format.
              </p>
              <button
                className="account-btn export"
                onClick={handleExport}
                disabled={exportLoading}
              >
                {exportLoading ? "Preparing..." : "Download my data"}
              </button>
            </div>

            {/* Art. 17 — Right to erasure */}
            <div className="account-action-card danger-card">
              <h3>🗑️ Delete account</h3>
              <p>
                Permanently delete your account and all associated data,
                including all your notes.{" "}
                <strong>This action cannot be undone.</strong>
              </p>
              {!showDeleteConfirm ? (
                <button
                  className="account-btn delete"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete my account
                </button>
              ) : (
                <div className="delete-confirm">
                  <p className="delete-confirm-text">
                    Are you sure? All your notes will be permanently deleted.
                  </p>
                  <div className="delete-confirm-buttons">
                    <button
                      className="account-btn delete"
                      onClick={handleDeleteAccount}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Deleting..." : "Yes, delete everything"}
                    </button>
                    <button
                      className="account-btn cancel"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {message && <p className="account-message">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountSettings;
