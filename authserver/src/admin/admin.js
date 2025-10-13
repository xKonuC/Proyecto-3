import express from "express";
import pool from "../database/dbConnection.js";
import pool2 from "../database/dbConnection2.js";
import { hashSync } from 'bcrypt';

const adminRouter = express.Router();

adminRouter.post("/removeAccount", async (req, res) => {
    const { id } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    DELETE FROM userAccount where id = ?
    `, [id]);
    const connection2 = await pool2.getConnection();
    const [result2] = await connection2.execute(`
    DELETE FROM user where userID = ?
    `, [id]);

    connection.release();
    connection2.release();
    if (result.affectedRows > 0 && result2.affectedRows > 0) {
        res.json({ message: "User deleted successfully" });
    } else {
        res.json({ message: "User not founded." });
    }

});
adminRouter.post("/updateEmail", async (req, res) => {
    const { id, email } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    UPDATE userAccount set email = ? where id = ?
    `, [email, id]);
    const connection2 = await pool2.getConnection();
    const [result2] = await connection2.execute(`
    UPDATE user set email = ? where userID = ?
    `, [email, id]);

    connection.release();
    connection2.release();
    if (result.affectedRows > 0 && result2.affectedRows > 0) {
        res.json({ message: "Email updated successfully" });
    } else {
        res.json({ message: "User not founded." });
    }


});

adminRouter.post("/addPassword", async (req, res) => {
    try {
        const { id, password} = req.body;
        const connection = await pool.getConnection();
        const updateQuery = "UPDATE userAccount SET password = ? WHERE id = ?";
        await connection.execute(updateQuery, [hashSync(password, 10), id]);
        connection.release();
        res.json({ message: "Password added" });
    } catch (error) {
        console.log("Error: " + error.message);
        res.json({ message: "Error" });
    }
});

export default adminRouter;
