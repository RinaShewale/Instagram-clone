import React from 'react'
import "./Style/nav.scss"
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()
  return (
  <nav>
    <div className="logo">
        <h1>instagram</h1>
    </div>

    <div className="btn">
        <button onClick={() => navigate('/createpost')}>post craete</button>
    </div>
  </nav>
  )
}

export default Nav
