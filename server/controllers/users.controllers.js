const { httpError } = require('../helpers/handleError')

const getItems = (req, res) => {

}

const getItem = (req, res) => {

}

const createItem = async (req, res) => {
  try{
    const {user_id,username,email,rol_id,password}= req.body;
    const [result] = await pool.query('INSERT INTO users (user_id,username,email,rol_id,password) VALUES (?, ?, ?, ?, ?)', [user_id,username,email,rol_id,password]);
    res.json({ message: "User created", user_id: result.insertId, username,email,rol_id,password });

  } catch(e){
    httpError(res, e)
  }

}


const updateItem = (req, res) => {

}

const deleteItem = (req, res) => {

}

module.exports = { getItem, getItems, deleteItem, createItem, updateItem }