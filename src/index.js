const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const server = express();

server.use(express.json({ limit: '25mb' }));

const corsOptions = {
    origin: '*', // Permite todos los orígenes, ajusta según sea necesario
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

// Aplicar el middleware de CORS con las opciones definidas
server.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function conexion() {
    try {
        const conex = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        console.log('Conexion con la BD ' + conex.threadId);
        return conex;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw new Error('No se pudo conectar con la base de datos');
    }
}

server.get('/', (req, res) => {
    console.log('Request received at /');
    res.send('API is running');
});

server.get('/jewels', async (req, res) => {
    try {
        const conn = await conexion();
        const select = `
            SELECT 
                c.id AS collection_id,
                c.title AS collection_title,
                j.id AS jewel_id,
                j.title AS jewel_title,
                j.description AS jewel_description,
                j.price AS jewel_price,
                j.creationDate AS jewel_creationDate,
                j.category AS jewel_category,
                ji.image AS jewel_image,
                ji.description AS jewel_image_description
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
            res.status(404).json({ message: "No hay joyas disponibles" });
        } else {
            res.status(200).json({ results });
        }
    } catch (error) {
        console.error('Error fetching jewels:', error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
});

server.get('/collections/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await conexion();
        const select = 'SELECT * FROM collections WHERE id = ?';
        const [results] = await conn.query(select, [id]);
        await conn.end();

        if (results.length === 0) {
            res.status(404).json({ message: "Esta colección no está disponible" });
        } else {
            res.status(200).json({ result: results[0] }); // Para devolver un objeto en lugar de un array
        }
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
});

server.get('/jewels/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await conexion();
        const select = 'SELECT * FROM jewels WHERE id = ?';
        const [results] = await conn.query(select, [id]);
        await conn.end();

        if (results.length === 0) {
            res.status(404).json({ message: "Esta joya no está disponible" });
        } else {
            res.status(200).json({ result: results[0] }); // Para devolver un objeto en lugar de un array
        }
    } catch (error) {
        console.error('Error fetching jewel:', error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
});
