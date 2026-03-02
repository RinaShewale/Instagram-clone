import React, { useContext } from 'react';
import { followcontext } from '../Followcontext';
import '../Component/Style/follower.scss';

const Follower = () => {
  const { followers, following, loading, handlefollow, handleunfollow } = useContext(followcontext);

  return (
    <div className="connections-page">
      
      {/* Followers Section */}
      <div className="followers-section">
        <h2>Followers</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : followers?.length > 0 ? (
          followers.map(user => {
            const isFollowing = following?.some(f => f._id === user._id);
            return (
              <div key={user._id} className="user-row">
                <div className="user-profile">
                  <img
                    className="profile-image"
                    src={user.profile_img || "/default-profile.png"}
                    alt={user.username}
                  />
                  <p className="username">{user.username}</p>
                </div>
                <button
                  className={isFollowing ? "unfollow-btn" : "follow-btn"}
                  onClick={() =>
                    isFollowing ? handleunfollow(user.username) : handlefollow(user.username)
                  }
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            );
          })
        ) : (
          <p className="empty">No followers yet 😔</p>
        )}
      </div>

      {/* Following Section */}
      <div className="following-section">
        <h2>Following</h2>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : following?.length > 0 ? (
          following.map(user => (
            <div key={user._id} className="user-row">
              <div className="user-profile">
                <img
                  className="profile-image"
                  src={user.profile_img || "/default-profile.png"}
                  alt={user.username}
                />
                <p className="username">{user.username}</p>
              </div>
              <button
                className="unfollow-btn"
                onClick={() => handleunfollow(user.username)}
              >
                Unfollow
              </button>
            </div>
          ))
        ) : (
          <p className="empty">Not following anyone yet 😔</p>
        )}
      </div>

    </div>
  );
};

export default Follower;