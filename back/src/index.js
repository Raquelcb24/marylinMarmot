const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json({limit: '25mb'}));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function conexion() {
    const conex = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    await conex.connect();
    console.log('conexion con la BD ' + conex.threadId) 
    return conex;
}

/*  conexion(); */


server.get('/jewels', async (req, res) => {
  try {
      const conn = await conexion();
      const select = `
          SELECT 
              c.id as collection_id,
              c.title as collection_title,
              j.id as jewel_id,
              j.title as jewel_title,
              j.description as jewel_description,
              j.price as jewel_price,
              j.creationDate as jewel_creationDate,
              j.category as jewel_category,
              ji.image as jewel_image,
              ji.description as jewel_image_description
          FROM 
              collections c
          JOIN 
              jewels j ON c.id = j.id_collection
          LEFT JOIN 
              jewels_images ji ON j.id = ji.id_jewel;
      `;
      const [results] = await conn.query(select);
      await conn.end();

      if (results.length === 0) {
          res.status(400).json({ message: "No hay joyas disponibles" });
      } else {
          res.status(200).json({ results });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
  
server.get("/collections/:id", async (req, res)=>{
    try{
        const { id } = req.params; 
        const conn = await conexion(); 
        const select = 'select * from collections where id = ?';
        const [results] = await conn.query(select, [id]);
     
  
        if (results.length === 0){
          res.status(400).json({message: "Esta colección no esta disponible"});
         }else {
          res.status(200).json({results: results[0]}); //para no devolver un array y me devuelva un objeto
         }
  }catch(error){
      res.status(400).json(error)
  }
  });

  server.get("/jewels", async (req, res) => {
    try {
      const conn = await conexion();
      const select = `
         SELECT 
            c.id as collection_id,
            c.title as collection_title,
            j.id as jewel_id,
            j.title as jewel_title,
            j.description as jewel_description,
            j.price as jewel_price,
            j.creationDate as jewel_creationDate,
            j.category as jewel_category,
            ji.image as jewel_image,
            ji.description as jewel_image_description
        FROM 
            collections c
        JOIN 
            jewels j ON c.id = j.id_collection
        LEFT JOIN 
            jewels_images ji ON j.id = ji.id_jewel;
      `;
      db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).send('Error en la consulta');
        }
        res.json({ results });
    });
      const [results] = await conn.query(select);
      await conn.end();
  
      if (results.length === 0) {
        res.status(400).json({ message: "No hay joyas disponibles" });
      } else {
        res.status(200).json({ results });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });
  
  server.get("/jewels/:id", async (req, res)=>{
    try{
        const { id } = req.params; 
        const conn = await conexion(); 
        const select = 'select * from jewels where id = ?';
        const [results] = await conn.query(select, [id]);
     
  
        if (results.length === 0){
          res.status(400).json({message: "Esta joya no esta disponible"});
         }else {
          res.status(200).json({results: results[0]}); //para no devolver un array y me devuelva un objeto
         }
  }catch(error){
      res.status(400).json(error)
  }
  });