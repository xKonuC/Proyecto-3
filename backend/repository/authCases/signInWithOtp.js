class SignInWithOtp {
  async signInWithOtp() {
    throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
  }
}

class SignInWithOtp_SupaBase extends SignInWithOtp {
  async signInWithOtp(dataBase, email, emailRedirectTo) {
    const { error } = await dataBase.auth.signInWithOtp({ email, options: { emailRedirectTo } });
    if (error) { throw error; }
  }
}

export { SignInWithOtp_SupaBase as SignInWithOtp };
