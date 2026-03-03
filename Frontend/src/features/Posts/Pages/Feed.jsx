import React, { useContext, useEffect, useState } from 'react'
import "../Component/Style/feed.scss"
import Post from '../Component/Post'
import { usepost } from '../hook/usepost'
import Nav from '../Component/Nav'
import { Link } from 'react-router-dom'
import { Authcontext } from "../../auth/Auth.Context";
import { useNavigate } from "react-router-dom";


const Feed = () => {

    const { user, handleLogout , authLoading} = useContext(Authcontext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogoutClick = () => {
        handleLogout();      // context madun session clear
        navigate("/login");  // redirect to login
    };

    const handleCreatePost = () => {
        navigate("/createpost"); // go to create post page
    };



    const { feed, handlegetfeed, loading, handlelike, handleunlike } = usepost()

    useEffect(() => {
        handlegetfeed();
    }, []);

    // ✅ Only redirect after auth check
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
        }
    }, [authLoading, user, navigate]);

    // ✅ Show loader while auth check is running
    if (authLoading || !user) {
        return (
            <main>
                <h1>Checking login status...</h1>
            </main>
        );
    }

    if (!feed || feed.length === 0) {
        return (
            <>
                <Nav />
                <main >

                    <div className="feed">
                        <h2 style={{ textAlign: "center", marginTop: "-6rem" }}>
                            No Posts yet 😔
                        </h2>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Nav />
            <main className='feedpage'>
                {/* Mobile menu button */}
                <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

                {/* Mobile create post button */}
                <button onClick={handleCreatePost} className="mobile-create-btn">+</button>

                <div className={`feed ${menuOpen ? 'menu-open' : ''}`}>
                    <div className="feature">
                        <div className="user">
                            <img
                                src={user?.profile_img || "/default-profile.png"}
                                alt={user?.username || "Profile"}
                            />
                            <h1>{user?.username || "User"}</h1>
                        </div>

                        <ul>
                            <li><Link to="/explore">Explore</Link></li>
                            <li><Link to="/connections">Follower</Link></li>
                            <li><Link to="/saved">Saved</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                        </ul>

                        <div className="btn">
                            <button onClick={handleLogoutClick}>Logout</button>
                        </div>

                    </div>
                    <div className="posts">
                        {feed.map(post => {
                            return (<Post key={post._id} user={post.user} post={post} loading={loading} handlelike={handlelike} handleunlike={handleunlike} />)
                        })}

                    </div>
                </div>
            </main>
        </>
    )
}

export default Feed
