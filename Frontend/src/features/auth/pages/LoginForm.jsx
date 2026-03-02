import React, { useState } from 'react'
import "../style/form.scss"
import { Link } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { handleLogin, loading } = useAuth()

    const navigate= useNavigate()

    if(loading){
        return(<h1>Loading</h1>)
    }


    async function HandleSubmit(e) {
        console.log("user logged in");
        

        e.preventDefault()

        handleLogin(username, password)
            .then(res => {
                console.log(res);
                navigate("/")

            })

    }

    return (

        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={HandleSubmit}>
                    <input onInput={(e) => { setUsername(e.target.value) }} type="text" name='Username' placeholder='Enter Username' />
                    <input onInput={(e) => { setPassword(e.target.value) }} type="text" name='Password' placeholder='Enter Password' />
                    <button type='submit' className='primary'>login</button>
                </form>

                <p> Don't have an account? <Link className='toggle-auth-form' to='/register'>Register</Link></p>

            </div>

        </main>
    )
}

export default LoginForm
