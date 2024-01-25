import { json } from "react-router-dom"
import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, resp) => {
    const q = "SELECT * from users where email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return resp.json(err)
        if (data.length) return resp.status(409).json("User already exists!")

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash
        ]
        db.query(q, [values], (err,data)=>{
            if (err) return resp.json(err)
            return resp.status(200).json("User has been created")
        })
    })

}
export const login = (req, resp) => {

    console.log("Login request received:", req.body);

    // check user
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            console.error("Database query error:", err);
            return resp.status(500).json("Internal Server Error");
        }

        if (data.length === 0) {
            console.log("User not found");
            return resp.status(404).json("User not found");
        }

        // check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) {
            console.log("Wrong username or password!");
            return resp.status(400).json("Wrong username or password!");
        }

        const { password, ...other } = data[0];
        const token = jwt.sign({ id: data[0].id }, "jwtkey");

        console.log("Login successful. User data:", other);

        resp.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    });
}

export const logout = (req, resp) => {
    resp.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out.")

}