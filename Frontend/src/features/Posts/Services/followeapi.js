import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const followUser = async (username) => {
    const response = await api.post(`/user/follow/${username}`);
    return response.data;
}

export const unfollowUser = async (username) => {
    const response = await api.post(`/user/unfollow/${username}`);
    return response.data;
}

export const getFollowers = async () => {
    const response = await api.post('/user/connections');
    return response.data;
}