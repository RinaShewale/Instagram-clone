import React, { useEffect, useState } from "react";
import { handlesave, fetchpost } from "../Services/postapi";
import "../Component/Style/save.scss";
import Post from "../Component/Post";

const Savedpost = () => {
  const [savedpost, setsavedPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      const posts = await fetchpost();
      const savedArray = Array.isArray(posts) ? posts : posts.savedPosts || [];
      const saved = savedArray.map((p) => ({ ...p, issaved: true }));
      setsavedPost(saved);
      setLoading(false);
    };
    fetchSavedPosts();
  }, []);

  const handleunsave = async (postId) => {
    await handlesave(postId); // toggle save
    setsavedPost(savedpost.filter((p) => p._id !== postId));
  };

  if (loading) return <p className="loading-msg">Loading...</p>;
  if (!savedpost.length) return <p className="loading-msg">No saved posts yet</p>;

  return (
    <div className="saved-posts-container">
      {savedpost.map((post) => (
        <Post
          key={post._id}
          post={post}
          user={post.user || {}}
          handleunsave={handleunsave}
          showActions={false} // hide follow buttons in saved posts
          className="saved-post"
        />
      ))}
    </div>
  );
};

export default Savedpost;