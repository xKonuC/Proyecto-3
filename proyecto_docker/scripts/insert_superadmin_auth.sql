-- SQL para insertar SuperAdmin en authdb (autenticación)
-- Ejecutar este script en la base de datos magister (authdb)

-- Insertar usuario SuperAdmin en authdb
INSERT INTO `userAccount` (
    `name`,
    `email`,
    `provider`,
    `password`
) VALUES (
    'Super Admin Administrador Sistema',
    'superadmin@magister.cl',
    'Email',
    'Superadmin123!'  -- Contraseña temporal
);
