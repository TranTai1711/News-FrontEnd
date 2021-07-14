import React, { useState, useEffect } from 'react'
import './sidebar.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/api/category");
            setCats(res.data);
        };
        getCats();
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c) => (
                        <Link key={c._id} to={`/?cat=${c.name}`} className="link">
                            <li  className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
