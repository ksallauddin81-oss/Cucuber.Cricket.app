const isLocal = window.location.hostname === "localhost";

export const API_BASE = isLocal
  ? "http://127.0.0.1:8000"
  : "https://your-backend-url.onrender.com"; // 🔴 REPLACE THIS