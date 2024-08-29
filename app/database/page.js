"use client"

import { useState } from "react";

export default function ManageFiles() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateFiles = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/generateFiles", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  const handleUpdateFiles = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/updateFiles", {
      method: "POST",
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.message);
  };

  return (
    <div>
      <h1>Manage GameChanger Academy Files</h1>
      <button onClick={handleGenerateFiles} disabled={loading}>
        {loading ? "Generating..." : "Generate Files"}
      </button>
      <button onClick={handleUpdateFiles} disabled={loading}>
        {loading ? "Updating..." : "Update Files"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
