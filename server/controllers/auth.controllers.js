import { pool } from '../db.js';
import {encrypt, compare}  from "../helpers/handleBcrypt.js";
import { tokenSign } from '../helpers/generateToken.js';



export const registerCtrl = async (req, res) => {
    const { username, email, rol_id, password } = req.body;

    const passwordHash = await encrypt(password)
    const newUser = {
        username,
        email,
        rol_id,
        password: passwordHash,
    };
    try {
        const result = await pool.query("INSERT INTO users SET ?", [newUser]);
        res.json({ message: "User created", user_id: result.insertId, username, email });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const loginCtrl = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (result.length === 0) {
            return res.status(400).json({ message: "The email doesn't exists" });
        }
        const user = result[0];
        const isMatch = await compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "The password is incorrect" });
        }
        const token = await tokenSign(user);
        res.json({ message: "Login success",data: user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}