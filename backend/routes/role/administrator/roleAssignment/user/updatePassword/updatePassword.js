import { UpdatePassword } from '../../../../../../repository/roleAssignment/user/updatePassword.js';

const updatePassword = async (req, res) => {
  console.log("--> updatePassword Controller Reached (Graduate/Admin)");
  const { userID, password } = req.body;
  console.log(`--> Attempting to update password for userID: ${userID}`);
  
  const updatePasswordInstance = new UpdatePassword();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    
    console.log("--> Calling UpdatePassword Repository...");
    await updatePasswordInstance.updatePassword(userID, password, access_token);
    
    console.log("--> Password update successful!");
    res.status(200).json({ verificationMessage: 'La contraseña se actualizó exitosamente' });
  } catch (error) {
    console.error("--> Error in updatePassword:");
    if (error.response) {
         console.error("--> Upstream Error Status:", error.response.status);
         console.error("--> Upstream Error Data:", error.response.data);
         if (error.response.status) {
            res.status(error.response.status).json(error.response.data);
            return;
         }
    } else {
        console.error("--> Error Message:", error.message);
    }

    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message || error });
    }
  }
};
export default updatePassword;
