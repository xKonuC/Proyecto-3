class AdminInviteWorker {
  async adminInviteWorker() {
    throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
  }
}

class AdminInviteWorker_SupaBase extends AdminInviteWorker {
  async adminInviteWorker(dataBase, email, redirectTo) {
    const { data: { user }, error } = await dataBase.auth.admin.inviteUserByEmail(email, { redirectTo });
    if (error) { throw error; }
    return user;
  }
}

export { AdminInviteWorker_SupaBase as AdminInviteWorker };
