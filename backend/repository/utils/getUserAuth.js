import jwt from 'jsonwebtoken';

class GetUserAuth {
  async getUserAuth(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
      return { userID: decoded.id, ...decoded };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return null;
      }
      throw error;
    }
  }
}

export { GetUserAuth };
