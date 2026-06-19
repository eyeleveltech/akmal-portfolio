import axios from "axios";

// Single source of truth for the backend base URL. Override per-environment
// via VITE_API_URL (e.g. https://api.example.com/api); falls back to the
// local dev server. Never hardcode the host in components.
export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export const api = axios.create({ baseURL: API_URL });
