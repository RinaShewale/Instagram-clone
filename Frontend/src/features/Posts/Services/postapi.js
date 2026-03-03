import axios from "axios";

const api = axios.create({
  baseURL: "https://instagram-clone-2-ph8a.onrender.com/api",
  withCredentials: true // must for sending cookies
});

// -----------------------------
// FEED / POST APIs
// -----------------------------
export async function getfeed() {
  const response = await api.get("/post/feed");
  return response.data;
}

export async function createPost(imagefile, caption) {
  const formData = new FormData();
  formData.append("image", imagefile);
  formData.append("caption", caption);
  const response = await api.post("/post", formData);
  return response.data;
}

export async function likepost(postId) {
  const response = await api.post(`/post/like/${postId}`);
  return response.data;
}

export async function unlikepost(postId) {
  const response = await api.post(`/post/unlike/${postId}`);
  return response.data;
}

export async function handlesave(postId) {
  const response = await api.post(`/post/save/${postId}`);
  return response.data;
}

export async function fetchpost() {
  const response = await api.get("/post/getsave");
  return response.data;
}