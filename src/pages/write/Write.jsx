import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../GlobalState'
import './write.css'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    title: '',
    desc: '',
    categories: '',
    username: ''
}



const Write = () => {
    const state = useContext(GlobalState)
    const [post, setPost] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [photo, setImages] = useState(false)
    const [users] = state.userAPI.user

    useEffect(() => {
        setPost({ ...post, username: users.name })
    }, [users.name])
    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if (!file) return alert("File not exist.")

            if (file.size > 1024 * 1024) //1mb
                return alert("Size too large!")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('/api/upload', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })

            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            await axios.post('/api/destroy', { public_id: photo.public_id })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setPost({ ...post, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!photo) {
                return alert("No Image Upload")
            }
            else {
                await axios.post('/api/posts', { ...post, photo })
            }
            setImages(false)
            setPost(initialState)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: photo ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                <div id="file_img" style={styleUpload}>
                    <img src={photo ? photo.url : ''} alt="" />
                    <span onClick={handleDestroy}>X</span>
                </div>

            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" required
                        value={post.username} onChange={handleChangeInput} disabled />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={post.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="desc">Description</label>
                    <textarea type="text" name="desc" id="desc" required
                        value={post.desc} rows="6" onChange={handleChangeInput} />
                </div>
                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="categories" onChange={handleChangeInput}>
                        <option value={post.categories}>Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Write

