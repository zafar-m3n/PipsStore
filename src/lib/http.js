import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "";

/** Shared Axios instance pointed at the PipsStore contact API. */
export const http = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export default http;
