import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        if(payload) return payload;
        return null;
    } catch (error) {
        return null;
    }
}
export default verifyToken;