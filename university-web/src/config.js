// Central place for the backend URL.
//
// In development it falls back to the local Django server.
// On Vercel, set REACT_APP_API_URL (Project Settings -> Environment Variables)
// to your deployed Render URL, e.g. https://universityhub-api.onrender.com
export const API_URL = (
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

// Build a full API path, e.g. apiUrl("/academic/api/students/")
export const apiUrl = (path) =>
  `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
