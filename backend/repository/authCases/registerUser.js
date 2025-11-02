class RegisterUser {
  async registerUser() {
    throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
  }
}

class RegisterUser_SupaBase extends RegisterUser {
  async registerUser(dataBase, email, password) {
    const { data, error } = await dataBase.auth.signUp({ email, password });
    if (error) { throw error; }
    return data;
  }
}

export { RegisterUser_SupaBase as RegisterUser };
