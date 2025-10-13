import express from 'express';
import pool from '../database/dbConnection.js';
import pool2 from '../database/dbConnection2.js';
import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import encrypt from '../functions/encrypt.js';

const emailRouter = express.Router();

// Endpoint de prueba para verificar la conexión a la base de datos
emailRouter.get("/test", async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute("SELECT COUNT(*) as count FROM userAccount");
        connection.release();
        res.json({ message: "Conexión exitosa", userCount: rows[0].count });
    } catch (error) {
        console.log("Error de conexión:", error);
        res.status(500).json({ error: error.message });
    }
});
// emailRouter.get("/", async (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//                 console.error('La conexión con la base de datos fue cerrada.');
//             }
//             if (err.code === 'ER_CON_COUNT_ERROR') {
//                 console.error('La base de datos tiene demasiadas conexiones.');
//             }
//             if (err.code === 'ECONNREFUSED') {
//                 console.error('La conexión con la base de datos fue rechazada.');
//             }
//             console.error('Error de conexión a la base de datos:', err);
//         } else {
//             console.log('Conexión a la base de datos establecida.');
//             connection.release(); // Devolver la conexión al pool
//         }
//     });
//     try {
//         const connection = await pool.getConnection();
//         const [rows] = await connection.execute("SELECT * from userAccount;");
//         res.json({ message: rows });
//         connection.release();
//     } catch (error) {
//         console.log("Connecting Error", error);
//         res.json({ message: "Error de conexión" });
//     }
// });
// emailRouter.post("/register", async (req, res) => {
//     try {
//         const { rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, phone, entry, workPlace, phoneWork, job, articulation, provider, password } = req.body;
//         const connection = await pool.getConnection();
//         const connection2 = await pool2.getConnection();

//         const [existingUser] = await connection.execute(`
//             SELECT id FROM userAccount WHERE email = ?
//         `, [email]);

//         if (existingUser.length > 0) {
//             res.status(409).json({ message: "Email already registered" });
//             connection.release();
//             return;
//         }
//         const [result] = await connection.execute(`
//         INSERT INTO userAccount (name, email, provider, password)
//         VALUES (?,?,?,?)
//         `, [`${firstName} ${secondName} ${surname1} ${surname2}`, email, provider || null, hashSync(password, 10)]);

//         if (result.affectedRows > 0) {
//             const id = result.insertId;
//             const [result2] = await connection2.execute(`
//             INSERT INTO user (userID,rut,firstName,secondName,surname1,surname2,sex,civilStatus,birthday,address,email,phone,entry,workPlace,phoneWork,job,articulation)
//             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
//             `, [id, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, phone, entry, workPlace, phoneWork, job, articulation]);
//             if (result2.affectedRows > 0) {
//                 res.json({ message: "registered user successfully" });
//             } else {
//                 res.json({ message: "Failed to register user" });
//             }
//         } else {
//             res.json({ message: "Failed to register user" });
//         }

//         connection.release();
//         connection2.release();
//     } catch (error) {
//         console.log("Connecting Error");
//         res.json({ message: "Error de conexión" });
//     }
// });
emailRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const connection = await pool.getConnection();
        const connection2 = await pool2.getConnection();

        const [existingUser] = await connection.execute(`
            SELECT * FROM userAccount WHERE email = ?
        `, [email]);
        // const [existingUser2] = await connection2.execute(`
        // SELECT * FROM user WHERE email = ?
        // `, [email]);
        connection.release();
        // connection2.release();
        if (!existingUser[0]) {
            return res.status(404).json(encrypt({ message: "User not found" }));
        }
        const user = existingUser[0]
        const userData = {} // existingUser2[0] || {}
        if (!user.password) {
            return res.status(401).json(encrypt({ message: "User without password" }));
        }        
        if (!compareSync(password, user.password)) {
            return res.status(401).json(encrypt({ message: "Incorrect password" }));
        }
        const payload = {
            id: user.id, ...userData
        }
        const token = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ counter: 0, ...payload }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "2d" });
        return res.json(encrypt({
            message: "logged in successfully",
            token: "Bearer " + token,
            refreshToken: "Bearer " + refreshToken,
            id: user.id
        }));
    }
    catch (error) {
        console.log(error);
        res.status(500).json(encrypt({ 
            message: "Internal server error",
            error: error.message 
        }));
    }

});

export default emailRouter;
