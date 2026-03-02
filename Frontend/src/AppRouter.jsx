import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './features/auth/pages/LoginForm'
import RegisterForm from './features/auth/pages/RegisterForm'
import Feed from './features/Posts/Pages/Feed'
import Createpost from './features/Posts/Pages/Createpost'
import Savedpost from './features/Posts/Pages/Savedpost'
import Follower from './features/Posts/Pages/Follower'
import { Authcontext } from './features/auth/Auth.Context'

function AppRouter() {
    const { user } = useContext(Authcontext);
    return (
        <BrowserRouter>

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/feed" />} />
                <Route path="/register" element={!user ? <RegisterForm /> : <Navigate to="/feed" />} />

                {/* Protected routes */}
                <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />
                <Route path="/feed" element={user ? <Feed /> : <Navigate to="/login" />} />
                <Route path="/createpost" element={user ? <Createpost /> : <Navigate to="/login" />} />
                <Route path="/connections" element={user ? <Follower /> : <Navigate to="/login" />} />
                <Route path="/saved" element={user ? <Savedpost /> : <Navigate to="/login" />} />
                

         

                {/* Catch-all */}
                <Route path="*" element={<Navigate to={user ? "/feed" : "/login"} />} />

            </Routes>

        </BrowserRouter>
    )
}



export default AppRouter
