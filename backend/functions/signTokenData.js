import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const signTokenData = (data) =>{
    try {
        const token = jwt.sign(data, process.env.SECRET_TOKEN);
        return token;
    } catch (error) {
        throw new Error("Error signing new token");
    }
}
export default signTokenData;