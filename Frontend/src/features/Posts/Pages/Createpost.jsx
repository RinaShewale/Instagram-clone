import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../Component/Style/createpost.scss"
import { usepost } from '../hook/usepost'


const Createpost = () => {

  const [caption, setCaption] = useState('')


  const postImageref = useRef(null)

  const navigate = useNavigate()
  const { loading, handlecreatepost } = usepost()


  async function HandleSubmit(e) {
    e.preventDefault()

    const file = postImageref.current.files[0]
    if (!file) return alert("Please choose an image!")

    await handlecreatepost(file, caption)
    navigate("/")
  }


  return (


    <main className='createform'>
      <div className="formcontainer">
        <h1>Create Post</h1>
        <form onSubmit={HandleSubmit}>
          <label htmlFor='postimage' className='createpostimageref'>Choose Image</label>
          <input hidden type="file" ref={postImageref} id="postimage" />

          <input value={caption} onChange={(e) => { setCaption(e.target.value) }} type="text" name='Caption' placeholder='Caption' />

          <button type='submit' className='primary'>
            Post
          </button>
        </form>

      </div>

    </main>
  )
}

export default Createpost
