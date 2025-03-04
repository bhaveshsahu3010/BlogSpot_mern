import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from "../assets/edit.png"
import Delete from "../assets/delete.png"
import Menu from "./Menu"
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../context/authContext';

const Single = () => {
  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  const [post, setPost] = useState({})
  const location = useLocation()
  const postId = location.pathname.split('/')[2]
  const navigate = useNavigate()
  // console.log(postId)
  const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
        setPost(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [postId])
  const handleDelete =  async () => {
    console.log("DElete")
    try{
      await axios.delete(`http://localhost:8800/api/posts/${postId}`)
      navigate("/")
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username && <div className="edit">
          <Link to={`/write?edit=2`} state={post}>
          <img src={Edit} alt="" />
          </Link>
          <img onClick={handleDelete} src={Delete} alt="" />
        </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  )
}

export default Single
