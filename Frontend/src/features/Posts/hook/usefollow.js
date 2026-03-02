
import { useState, useEffect } from "react";
import { followUser, unfollowUser, getFollowers } from "../Services/followeapi";

export const useFollow = () => {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);




    const fetchConnection = async () => {
        setLoading(true)
        try {
            const data = await getFollowers()
             console.log("API response:", data); 
            setFollowers(data.followers)
            setFollowing(data.following)
        }
        catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false)
        }

    }




    const handlefollow = async (username) => {

        try {
            await followUser(username)
            fetchConnection()
        }
        catch (err) {
            setError(err.message || "Failed to follow");
        }
    }



    const handleunfollow = async (username) => {

        try {
            await unfollowUser(username)
            fetchConnection()
        }
        catch (err) {
            setError(err.message || "Failed to unfollow");
        }
    }


    useEffect(() => {
        fetchConnection()
    }, [])

    return { followers, following, loading, error, handlefollow, handleunfollow, fetchConnection }
}