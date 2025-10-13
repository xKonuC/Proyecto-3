import jwt from 'jsonwebtoken';

const encodeToken = (payload) => jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN);

export default encodeToken;
