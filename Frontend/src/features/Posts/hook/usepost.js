import { createPost, getfeed, likepost, unlikepost } from "../Services/postapi";
import { useContext, useEffect } from "react";
import { postcontext } from "../Postcontext";



export const usepost = () => {

    const context = useContext(postcontext)
    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handlegetfeed = async () => {
        setLoading(true)
        const data = await getfeed()
        setFeed(data.posts)
        setLoading(false)

    }


    const handlecreatepost = async (imagefile, caption) => {
        setLoading(true)
        const data = await createPost(imagefile, caption)
        setFeed([data.post, ...(feed || [])])

        setLoading(false)

    }

    const handlelike = async (postId) => {
        setFeed(prevFeed => prevFeed.map(post => post._id === postId ? { ...post, isLiked: true } : post))

        try {
            await likepost(postId)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleunlike = async (postId) => {
        setFeed(prevFeed => prevFeed.map(post => post._id === postId ? { ...post, isLiked: false } : post))

        try {
            await unlikepost(postId)
        }
        catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        handlegetfeed()
    }, [])

    return { loading, setLoading, post, setPost, feed, setFeed, handlegetfeed, handlecreatepost, handlelike, handleunlike }

}
