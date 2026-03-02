import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const RegisterForm = () => {
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()



    async function HandleSubmit(e) {
        e.preventDefault()

        await handleRegister(username, email, password)
        navigate("/")

    }


    if (loading) {
        return (<main><h1>Loading....</h1></main>)
    }


    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={HandleSubmit}>
                    <input onChange={(e) => { setUsername(e.target.value) }} type="text" name='Username' placeholder='Enter Username' />
                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" name='Email' placeholder='Enter Email' />
                    <input onChange={(e) => { setPassword(e.target.value) }} type="text" name='Password' placeholder='Enter Password' />
                    <button type='submit' className='primary'>Register</button>
                </form>
                <p>Already have an account? <Link className='toggle-auth-form' to='/login'>Login</Link></p>

            </div>

        </main>
    )
}

export default RegisterForm
