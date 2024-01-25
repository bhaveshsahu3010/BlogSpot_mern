import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"

const Home = () => {
  const [posts, setPosts] = useState([])
  const cat = useLocation().search
  console.log(cat)
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/${cat}`)
        setPosts(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [cat])
  // const posts = [
  //   {
  //     id:1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quis quisquam rerum blanditiis ducimus aliquid, veniam vel autem modi odit! Natus, quibusdam.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMvyILkyaxpN1FVw6wJyuvMhq6OhUBrIAAT042OWRnWOdhMYrSIDZyrjRGj0DqPI_tE4w&usqp=CAU"
  //   },
  //   {
  //     id:2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quis quisquam rerum blanditiis ducimus aliquid, veniam vel autem modi odit! Natus, quibusdam.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKqY6It6A00Jm0jeNOtcSPa3_Q9GKg5Tsr_5qD1DcZ_rle6yEZAxR_9PK-ABKt5rmido&usqp=CAU"
  //   },
  //   {
  //     id:3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quis quisquam rerum blanditiis ducimus aliquid, veniam vel autem modi odit! Natus, quibusdam.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH1cClGSa2h18rQGbmSbRngnKexrEGCxbKGo0b4flMuFRBhrDX1Y9u6RUB4nzJy6Krxwk&usqp=CAU"
  //   },
  //   {
  //     id:4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quis quisquam rerum blanditiis ducimus aliquid, veniam vel autem modi odit! Natus, quibusdam.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjfCsgHtyUqW-nQqYzKIPy9oZ4oSwG7n4kBIaGrDik_7xyYIkk4KQtxTP-hbD_dgyFgqo&usqp=CAU"
  //   },
  //   {
  //     id:5,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quis quisquam rerum blanditiis ducimus aliquid, veniam vel autem modi odit! Natus, quibusdam.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc3I-BUE_fxbKO5XxI8XRwG5Bt3-7aC2CKsXN-1I21hnBMAh-keTwbphL_hT-z8c48skU&usqp=CAU"
  //   }
  // ]

  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  console.log(posts)
  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
              <div className="bg"></div>
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link className='link' to={`/post/${post.id}`}>
              <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
