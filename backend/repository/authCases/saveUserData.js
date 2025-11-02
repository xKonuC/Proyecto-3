class SaveUserData {
  async saveUserData() {
    throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
  }
}

class SaveUserData_SupaBase extends SaveUserData {
  async saveUserData(dataBase, id, email) {
    const { error } = await dataBase.from('worker').insert({ userID: id, email });
    if (error) { throw error; }
  }
}

export { SaveUserData_SupaBase as SaveUserData };
