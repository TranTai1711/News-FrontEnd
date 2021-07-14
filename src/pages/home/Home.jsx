import React, {useEffect, useState} from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/posts/Posts'
import axios from 'axios'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation } from 'react-router'

const Home = () => {
    const [posts, setPosts] = useState([])
    const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
    
    return (
        <>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}

export default Home
