import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [user, setUser] = useState({
        name:'', email:'',password:''
    })

    const onChangeInput = e =>{
        const{name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register',{...user})

            localStorage.setItem('firstLogin' , true)
            
            window.location.href ="/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={registerSubmit}>
                <label>Username</label>
                <input className="registerInput" 
                    type="text" name="name" required value={user.name} onChange={onChangeInput}
                    placeholder="Enter your username..." />
                <label>Email</label>
                <input className="registerInput" 
                    type="email" name="email" required value={user.email} onChange={onChangeInput} 
                    placeholder="Enter your email..." />
                <label>Password</label>
                <input className="registerInput" 
                    type="password"  name="password" required value={user.password} onChange={onChangeInput}
                    placeholder="Enter your password..." />
                <button className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to='/login'>Login</Link>
            </button>
        </div>
    )
}

export default Register
