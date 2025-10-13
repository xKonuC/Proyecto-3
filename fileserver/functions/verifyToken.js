import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
        if(payload) return true;
        return false;
    } catch (error) {
        return false;
    }
}
export default verifyToken;