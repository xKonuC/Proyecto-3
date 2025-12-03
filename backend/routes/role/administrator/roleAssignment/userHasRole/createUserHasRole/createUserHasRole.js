import { CreateUserHasRole } from '../../../../../../repository/roleAssignment/userHasRole/createUserHasRole.js';

const createUserHasRole = async (req, res) => {
  const { userID, roleIDs } = req.body;
  console.log('🔍 createUserHasRole: Recibiendo datos', { userID, roleIDs });
  console.log('🔍 createUserHasRole: req.body completo:', req.body);
  console.log('🔍 createUserHasRole: req.headers:', req.headers);
  
  const createUserHasRoleInstance = new CreateUserHasRole();
  try {
    const createPromises = roleIDs.map(async (roleID) => {
      console.log(`🔍 createUserHasRole: Creando relación userID=${userID}, roleID=${roleID}`);
      await createUserHasRoleInstance.createUserHasRole(userID, roleID);
    });
    await Promise.all(createPromises);
    console.log('✅ createUserHasRole: Roles asignados exitosamente');
    res.status(200).json({ verificationMessage: 'Roles asignados exitosamente' });
  } catch (error) {
    console.error('❌ createUserHasRole: Error:', error);
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ 
        error: error.message || 'Error interno del servidor',
        details: error.toString()
      });
    }
  }
};
export default createUserHasRole;
