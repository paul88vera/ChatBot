import { useState } from "react";

function AvatarUploader({ company, onUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(company.avatarUrl || null);
  const [error, setError] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("avatar", file);

      const res = await fetch(
        `http://localhost:5400/api/upload/company-avatar/${company.publicId}`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setPreview(data.avatarUrl);
      onUploaded?.(data.avatarUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label style={{ fontWeight: 600 }}>Agent Avatar</label>

      {preview && (
        <img
          src={preview}
          alt="Agent"
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <small>Uploading…</small>}
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
}

export default AvatarUploader;
