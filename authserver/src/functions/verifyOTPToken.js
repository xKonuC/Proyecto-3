import jwt from 'jsonwebtoken';
import pool2 from '../database/dbConnection2.js';

const verifyOTPToken = async (req, res, next) => {
    try {
        const header = req.header("Authorization") || "";
        const otp = header.split(" ")[1];
        const payload = jwt.verify(otp, process.env.SECRET_OTP_TOKEN);
        if(!payload){
            return res.status(400).json({message: 'formato OTP token inválido'});
        }
        const {id, rut, firstName, email} = payload;
        
        const connection2 = await pool2.getConnection();
        const [otpToken] = await connection2.execute(`
        SELECT * FROM otpToken WHERE email = ? and token = ?
        `, [email, otp]);
        if(otpToken.length <=0){
            return res.status(400).json({message: 'OTP token no encontrado o ya utilizado'});
        }
        const [removeOTP] = await connection2.execute(`
        DELETE FROM otpToken WHERE email = ? and token = ?
    `, [email, otp]);
        if(removeOTP.affectedRows <= 0){
            return res.status(400).json({message: 'OTP token no encontrado'});
        }
        connection2.release();
        const token = jwt.sign({id, rut, firstName, email}, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h"});
        const refreshToken = jwt.sign({ counter: 0, id, rut, firstName, email }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "2d" });
        req.token = {token, refreshToken};
        next();
    } catch (error) {
        console.log("El token OTP es inválido", otp);
        res.status(400).json({message: 'OTP token inválido'});
    }

}
export default verifyOTPToken;