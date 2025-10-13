import express from "express";
import jwt from "jsonwebtoken";
import encrypt from "../functions/encrypt.js";
import pool2 from '../database/dbConnection2.js';
import verifyAccess from "../verifyAccess.js";
import verifyOTPToken from "../functions/verifyOTPToken.js";

const tokenRouter = express.Router();
tokenRouter.post("/user", verifyAccess, (req, res) => res.status(200).json(req.payload));
tokenRouter.post("/validate", verifyAccess, (req, res) => res.status(200).json({ message: "Token válido" }));
tokenRouter.post("/validateOTP", verifyOTPToken, (req, res) => res.status(200).json({ message: "OTP Token válido", ...req.token}));


tokenRouter.post("/refresh", async (req, res) => {
    try {
        const header = req.header("Authorization") || "";
        const refreshToken = header.split(" ")[1];    
        const decodedToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        const counter = decodedToken.counter;
        const connection2 = await pool2.getConnection();
        const [existingUser2] = await connection2.execute(`
            SELECT * FROM user WHERE userID = ?
        `, [decodedToken.userID]);
        if (existingUser2.length > 0) {
            const user = existingUser2[0];
            const payload = user;
            if (counter < 10) {
                const token = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
                const newRefreshToken = jwt.sign({ counter: counter + 1, ...payload }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "2d" });

                return res.json(encrypt({
                    message: "updated token",
                    token: "Bearer " + token,
                    refreshToken: "Bearer " + newRefreshToken,
                    id: decodedToken.userID
                }));
            } else {
                return res.json(encrypt({
                    message: "The refreshToken has already been used 10 times"
                }));
            }
        } else {
            res.json(encrypt({ message: "User not founded." }));
        }
    } catch (error) {
        console.log("Error al verificar el refresh token: " + error.message);
        res.json(encrypt({ message: "Error al verificar el refresh token: " + error.message }));
    }

});


export default tokenRouter;