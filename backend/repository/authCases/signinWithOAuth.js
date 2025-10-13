

class SignInWithOAuth {
  async signInWithOAuth(administrative) {
    if (administrative) {
      return { url: `${process.env.FRONTEND_URL}/auth/google/administrative` };
    } else {
      return { url: `${process.env.FRONTEND_URL}/auth/google` };
    }
  }
}

export { SignInWithOAuth };
