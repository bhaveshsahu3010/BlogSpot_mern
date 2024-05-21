import { db } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, resp) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat = ?" : "SELECT * FROM posts"
    db.query(q, [req.query.cat], (err, data) => {
        if (err)
            return resp.status(500).send(err)
        return resp.status(200).json(data)

    })
}
export const getPost = (req, resp) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) return resp.status(500).json(err)
        return resp.status(200).json(data[0])
    })
}
export const addPost = (req, resp) => {
    const token = req.cookies.access_token
    if (!token) return resp.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return resp.status(403).json("Token is not valid!")

        const q = "INSERT into posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ]
        db.query(q, [values], (err, data)=>{
            if(err) 
                {
                    return resp.status(500).send(err)
                }
            return resp.json("Post has been inserted!")
        })

    })
}
export const deletePost = (req, resp) => {
    const token = req.cookies.access_token
    if (!token) return resp.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return resp.status(403).json("Token is not valid!")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return resp.status(403).json("You can delete only your post!")
            return resp.json("Post has been deleted!")
        })
    })

}
export const updatePost = (req, resp) => {
    const token = req.cookies.access_token
    if (!token) return resp.status(401).json("Not Authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return resp.status(403).json("Token is not valid!")

        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat
        ]
        db.query(q, [...values, req.params.id, userInfo.id], (err, data)=>{
            if(err) return resp.status(500).send(err)

            return resp.json("Post has been updated!")
        })

    })
}