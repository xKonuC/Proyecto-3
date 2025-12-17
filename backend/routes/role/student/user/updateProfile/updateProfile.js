/* eslint-disable import/extensions */
import db from '../../../../database/dbConnection.js';

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      rut,
      sex,
      civilStatus,
      birthday,
      address,
      workPlace,
      phone,
      phoneWork,
      job,
      articulation,
    } = req.body;

    await db.query(
      `UPDATE users SET
        rut = ?,
        sex = ?,
        civil_status = ?,
        birthday = ?,
        address = ?,
        work_place = ?,
        phone = ?,
        phone_work = ?,
        job = ?,
        articulation = ?
      WHERE id = ?`,
      [
        rut,
        sex,
        civilStatus,
        birthday,
        address,
        workPlace,
        phone,
        phoneWork,
        job,
        articulation,
        userId,
      ]
    );

    return res.status(200).json({
      ok: true,
      message: 'Perfil actualizado correctamente',
    });
  } catch (error) {
    console.error('❌ updateProfile error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Error al actualizar el perfil',
    });
  }
};

export default updateProfile;
