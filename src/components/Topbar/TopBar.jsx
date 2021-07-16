import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import './topbar.css'


const Topbar = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    const adminRouter = () => {
        return (
            <div className="topRight">
                <li className="topListItem"><Link to="/post-manage" className="link"> Post</Link></li>
                <li className="topListItem"><Link to="/cat-manage" className="link">Categories</Link></li>
                <li className="topListItem"><Link to="/user-manage" className="link">Users</Link></li>
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
                <li className="topListItem"><Link to="/setting" className="link">Setting</Link></li>
                <li className="topListItem"><Link to="/" className="link" onClick={logoutUser}>Logout</Link></li>
            </>

        )
    }
    return (
        <div className="top">
            {/* <Container> */}
            <div className="container">

                <div className="topCenter">
                    <ul className="topList">
                        <div className=" topList_left">
                            <li className="topListItem">
                                <Link to="/" className="link">Home</Link>
                            </li>
                            <li className="topListItem">
                                <Link to="/" className="link">About</Link>
                            </li>
                            <li className="topListItem">
                                <Link to="/" className="link">Contact</Link>
                            </li>
                        </div>
                        {/* <li className="topListItem">
                        <Link to="/write" className="link">WRITE</Link>
                    </li> */}


                        {/* <li className="topListItem">
                        <Link className="link" to="/login">
                            LOGIN
                        </Link>
                    </li> */}
                        <div className="topRight">
                            {
                                isLogged && !isAdmin ? <li className="topListItem"><Link className="link" to="/write">Write</Link></li> :
                                    <li className="topListItem"><Link className="link" to="/login"></Link></li>
                            }
                            {isAdmin && adminRouter()}
                            {
                                isLogged ? loggedRouter() :

                                    <li className="topListItem">
                                        <Link to="/login" className="link">Login</Link>
                                    </li>
                            }
                        </div>
                    </ul>
                </div>
            </div>
            {/* </Container> */}
        </div>
    )
}

export default Topbar
