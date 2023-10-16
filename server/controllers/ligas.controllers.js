import {pool} from '../db.js'

export const getLigas = async (req, res) => {
    try {
        const [result] = await pool.query(
          "SELECT * FROM ligas ORDER BY created_at ASC"
        );
        res.json(result);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

};

export const getOneLiga = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM ligas WHERE id_liga = ?", [
          req.params.id_liga,
        ]);
    
        if (result.length === 0)
          return res.status(404).json({ message: "Liga not found" });
    
        res.json(result[0]);
      } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const createLiga = async (req, res) => {
    const { name, description } = req.body;
    const [result] = await pool.query('INSERT INTO ligas (name, description) VALUES (?, ?)', 
    [name, description]
    );
    res.json({ message: "createLiga", id: result.insertId, ...req.body });
    //in the body:
    // {
    //     "name": "Liga MX",
    //     "description": "Liga Mexicana"
    // }
    
}

export const updateLiga = async (req, res) => {
    try {
        const result = await pool.query("UPDATE ligas SET ? WHERE id_liga = ?", [
          req.body,
          req.params.id_liga,
        ]);
        res.json(result);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

export const deleteLiga = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM ligas WHERE id_liga = ?", [
          req.params.id_liga,
        ]);
    
        if (result.affectedRows === 0)
          return res.status(404).json({ message: "Liga not found" });
    
        return res.sendStatus(204);
      } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



