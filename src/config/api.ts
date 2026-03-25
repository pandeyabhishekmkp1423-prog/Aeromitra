const isLocal = window.location.hostname === "localhost";

export const API_URL = isLocal
  ? "http://localhost:5000"
  : "https://aviation-backend-zq41.onrender.com";