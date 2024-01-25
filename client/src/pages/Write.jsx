import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'

const Write = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [cat, setCat] = useState(state?.cat || '');
  const [file, setFile] = useState(null);
  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`http://localhost:8800/api/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <div className="editorCont">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visbility: </b> Public
          </span>
          <input type="file" style={{display:"none"}} name="" id="file" onChange={(e)=>setFile(e.target.files[0])} />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
          <input type="radio" name="cat" id="art" checked={cat === "art"} value="art" onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" id="science" checked={cat === "science"} value="science" onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor="art">Science</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" id="technology" checked={cat === "technology"} value="technology" onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor="art">Technology</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" id="cinema" checked={cat === "cinema"} value="cinema" onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor="art">Cinema</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" id="design" checked={cat === "design"} value="design" onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor="art">Design</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" id="food" checked={cat === "food"} value="food" onChange={(e)=>setCat(e.target.value)} />
          <label htmlFor="art">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
