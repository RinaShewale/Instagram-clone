import React, { useContext, useState } from "react";
import { followcontext } from "../Followcontext";
import { handlesave } from "../Services/postapi";

const Post = ({
  user,
  post,
  loading,
  handlelike,
  handleunlike,
  handleunsave,
  className = "",
  showActions = true,
}) => {
  const { following, handlefollow, handleunfollow } = useContext(followcontext);
  const [issaved, setisSaved] = useState(post?.issaved ?? false);

  const handleSavedClick = async () => {
    if (issaved) {
      await handleunsave(post._id);
      setisSaved(false);
    } else {
      await handlesave(post._id);
      setisSaved(true);
    }
  };

  return (
    <div className={`post ${className}`}>
      {/* User Details */}
      <div className="user-details">
        <div className="user">
          <div className="profile-wrap">
            <img
              className="profileimage"
              src={user?.profile_img || "/default-profile.png"}
              alt={user?.username || "Unknown User"}
            />
          </div>
          <h3>{user?.username || "Unknown User"}</h3>
        </div>

        {showActions && user?._id && (
          <div className="follow-btn-wrap">
            {following.some((f) => f._id === user._id) ? (
              <button
                className="unfollow-btn"
                onClick={() => handleunfollow(user.username)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow-btn"
                onClick={() => handlefollow(user.username)}
              >
                Follow
              </button>
            )}
          </div>
        )}
      </div>

      {/* Post Image */}
      <img src={post?.imgURI || "/default-post.png"} alt="Post" />

      {/* Action Icons */}
      <div className="icons">
        <div className="left">
          <button
            className="icon-btn"
            onClick={() =>
              post?.isLiked ? handleunlike(post._id) : handlelike(post._id)
            }
          >
            <svg
              className={post?.isLiked ? "liked" : ""}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path>
            </svg>
          </button>

          {/* Comment / Share icons */}
          <button className="icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5.76282 17H20V5H4V18.3851L5.76282 17ZM6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455Z"></path>
            </svg>
          </button>

          <button className="icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.3078L20.3214 11L15 6.69224V10H13C10.5795 10 8.41011 11.0749 6.94312 12.7735C8.20873 12.2714 9.58041 12 11 12Z"></path>
            </svg>
          </button>
        </div>

        <div className="right">
          <button
            onClick={handleSavedClick}
            className={`icon-btn ${issaved ? "saved" : ""}`}
          >
            <svg
              className={issaved ? "saved-icon" : ""}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Caption */}
      <div className="bottom">
        <p>{post?.caption}</p>
      </div>
    </div>
  );
};

export default Post;