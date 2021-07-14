import React, { useState } from 'react'
import './login.css'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const history = useHistory();

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })

            localStorage.setItem('firstLogin', true)
            window.location.href("/");
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={loginSubmit}>
                <label>Email</label>
                <input className="loginInput"
                    type="email" required name="email"
                    placeholder="Enter your email..."
                    value={user.email}
                    onChange={onChangeInput} />
                <label>Password</label>
                <input className="loginInput"
                    type="password" required autoComplete="on" name="password"
                    placeholder="Enter your password..."
                    value={user.password}
                    onChange={onChangeInput} />
                <button className="loginButton">Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to='/register'>Register</Link>
            </button>
        </div>
    )
}

export default Login
