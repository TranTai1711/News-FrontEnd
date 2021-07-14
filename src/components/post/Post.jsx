import React from 'react'
import './post.css'
import {Link} from 'react-router-dom'
// import axios from 'axios'

const Post = ({post}) => {
    return (
        <div className="post">
            <Link to={`/posts/${post._id}`} className="link">
            <img
                className="postImg"
                src={post.photo.url}
                alt=""
            />
            </Link>
            <div className="postInfo">
                <div className="postCats">
                    <span className="postCat">{post.categories}</span>
                    {/* <span className="postCat">Life</span> */}
                </div>
                <Link to={`/posts/${post._id}`} className="link">
                <span className="postTitle">{post.title}</span>
                </Link>
                {/* <span className="postTitle">
                    Lorem ipsum dolor sit amet
                </span> */}
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    )
}

export default Post
