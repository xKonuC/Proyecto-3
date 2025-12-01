import { CreateUserHasRole } from '../../../../../../repository/roleAssignment/userHasRole/createUserHasRole.js';
import posgradoPool from '../../../../../../posgradoDbConnection.js';
import GraduateModel from '../../../../../../models/Graduate.js';

const createUserHasRole = async (req, res) => {
  const { userID, roleIDs } = req.body;
  console.log('🔍 createUserHasRole: Recibiendo datos', { userID, roleIDs });
  console.log('🔍 createUserHasRole: req.body completo:', req.body);
  console.log('🔍 createUserHasRole: req.headers:', req.headers);
  
  const createUserHasRoleInstance = new CreateUserHasRole();
  const connection = await posgradoPool.getConnection();
  
  try {
    await connection.beginTransaction();

    const createPromises = roleIDs.map(async (roleID) => {
      console.log(`🔍 createUserHasRole: Creando relación userID=${userID}, roleID=${roleID}`);
      
      // Si el rol es Graduado (5), verificar y crear registro en graduate si no existe
      if (roleID === 5) {
        console.log('🔍 Rol de Graduado detectado. Verificando existencia en tabla graduate...');
        const existingGraduate = await GraduateModel.findByUserId(userID, connection);
        
        if (!existingGraduate) {
          console.log('⚠️ Usuario no existe en tabla graduate. Creando registro...');
          
          // Obtener datos del usuario
          const [users] = await connection.query('SELECT * FROM user WHERE userID = ?', [userID]);
          
          if (users.length > 0) {
            const user = users[0];
            const currentYear = new Date().getFullYear();
            
            const graduateData = {
              userID: user.userID,
              rut: user.rut,
              firstName: user.firstName,
              secondName: user.secondName,
              surname1: user.surname1,
              surname2: user.surname2,
              email: user.email,
              workPlace: null,
              job: null,
              entryYear: user.entry || currentYear, // Usar user.entry si existe, sino año actual
              graduationYear: null
            };
            
            await GraduateModel.create(graduateData, connection);
            console.log('✅ Registro de graduado creado automáticamente.');
          } else {
            console.warn('⚠️ No se encontraron datos del usuario para crear el registro de graduado.');
          }
        } else {
          console.log('✅ El usuario ya existe en la tabla graduate.');
        }
      }

      await createUserHasRoleInstance.createUserHasRole(userID, roleID, connection);
    });
    
    await Promise.all(createPromises);
    
    await connection.commit();
    console.log('✅ createUserHasRole: Roles asignados exitosamente');
    res.status(200).json({ verificationMessage: 'Roles asignados exitosamente' });
  } catch (error) {
    await connection.rollback();
    console.error('❌ createUserHasRole: Error:', error);
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ 
        error: error.message || 'Error interno del servidor',
        details: error.toString()
      });
    }
  } finally {
    connection.release();
  }
};
export default createUserHasRole;
