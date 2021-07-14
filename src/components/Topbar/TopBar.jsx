import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'

import './topbar.css'

const Topbar = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    const adminRouter = () => {
        return (
            <div className="topRight">
                <li className="topListItem"><Link to="/create_product" className="link"> POST</Link></li>
                <li className="topListItem"><Link to="/category" className="link">CATEGORIES</Link></li>
                <li className="topListItem"><Link to="/users" className="link">USERS</Link></li>

            </div>
        )
    }

    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }


    const loggedRouter = () => {
        return (
            <>
                <li className="topListItem"><Link to="/setting" className="link">SETTING</Link></li>
                <li className="topListItem"><Link to="/" className="link" onClick={logoutUser}>LOGOUT</Link></li>
            </>

        )
    }
    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className="link">HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/" className="link">CONTACT</Link>
                    </li>
                    {/* <li className="topListItem">
                        <Link to="/write" className="link">WRITE</Link>
                    </li> */}

                    {
                        isLogged && !isAdmin ? <li className="topListItem"><Link className="link" to="/write">WRITE</Link></li> :
                            <li className="topListItem"><Link className="link" to="/login"></Link></li>
                    }
                    {/* <li className="topListItem">
                        <Link className="link" to="/login">
                            LOGIN
                        </Link>
                    </li> */}
                    <div className="topRight">
                        {isAdmin && adminRouter()}
                        {
                            isLogged ? loggedRouter() :

                                <li className="topListItem">
                                    <Link to="/login" className="link">LOGIN</Link>
                                </li>
                        }
                    </div>
                    

                </ul>
            </div>
        </div>
    )
}

export default Topbar
