import React, { useEffect, useState, useContext } from 'react'
import './singlePost.css'
import axios from 'axios'
import { useLocation } from 'react-router'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'


const SinglePost = () => {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    // console.log(location.pathname.split("/")[2]);
    const [postss, setPost] = useState()
    const state = useContext(GlobalState)
    const [users] = state.userAPI.user
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        };
        getPost()
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/posts/${postss._id}`, {
                data: { username: users.name },
            });
            window.location.replace("/");
        } catch (err) { }
    };
    const handleUpdate = async () => {
        try {
            await axios.put(`/api/posts/${postss._id}`, {
                username: users.name,
                title,
                desc,
            });
            setUpdateMode(false)
        } catch (err) { }
    };
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {postss?.photo && (
                    <img
                        className="singlePostImg"
                        src={postss?.photo.url}
                        alt=""
                    />
                )}

                {
                    updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)} /> :
                        (
                            <h1 className="singlePostTitle">
                                {title}
                                {postss?.username === users.name && (<div className="singlePostEdit">
                                    <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                                </div>)}

                            </h1>
                        )
                }

                <div className="singlePostInfo">
                    <span>
                        Author:
                        <Link to={`/?user=${postss?.username}`} className="link">
                            <b> {postss?.username}</b>
                            {/* <p>fddsfsd</p> */}
                        </Link>
                    </span>
                    <span>{new Date(postss?.createdAt).toDateString()}</span>
                    {/* <span>1 hour</span> */}
                </div>
                {
                    updateMode ? (<textarea className="singlePostDescInput"
                        value={desc} onChange={(e) => setDesc(e.target.value)} />) :
                        (
                            <p className="singlePostDesc">
                                {desc}
                                {/* ddsad */}
                            </p>
                        )
                }
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    )
}

export default SinglePost
