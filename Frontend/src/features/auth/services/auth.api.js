import axios from "axios";

export const api = axios.create({
  baseURL: "https://instagram-clone-2-ph8a.onrender.com/api/auth",
  withCredentials: true
});

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", { username, email, password });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function login(username, password) {
  try {
    const response = await api.post("/login", { username, password });
    return response.data; // backend sets cookie
  } catch (err) {
    throw err;
  }
}

export async function getme() {
    try {
        const response = await api.get("/get-me"); // ✅ GET request
        return response.data;
    } catch (err) {
        throw err;
    }
}



export async function fetchUserProfile(username) {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (err) {
    throw err;
  }
}