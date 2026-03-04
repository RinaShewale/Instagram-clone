import {  createContext, useState } from "react";
import Post from "./Component/Post";
import Feed from "./Pages/Feed";

export const postcontext = createContext()

export const Postcontextprovider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState(null);
    const [feed, setFeed] = useState([]);


    
    return (
        <postcontext.Provider value={{ loading, setLoading, post, setPost, feed, setFeed }}>
        {children}
    </postcontext.Provider>
)

}