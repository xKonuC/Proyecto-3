-- SQL para insertar SuperAdmin en phpMyAdmin
-- Ejecutar este script en la base de datos posgrado_db

-- 1. Insertar usuario SuperAdmin
INSERT INTO `user` (
    `rut`, 
    `firstName`, 
    `secondName`, 
    `surname1`, 
    `surname2`, 
    `sex`, 
    `civilStatus`, 
    `birthday`, 
    `address`, 
    `email`, 
    `personalEmail`, 
    `phone`, 
    `entry`, 
    `group`, 
    `workPlace`, 
    `phoneWork`, 
    `job`, 
    `articulation`
) VALUES (
    '12.345.678-9',  -- RUT del SuperAdmin
    'Super',         -- firstName
    'Admin',         -- secondName
    'Administrador', -- surname1
    'Sistema',       -- surname2
    'M',             -- sex
    'Soltero/a',     -- civilStatus
    '1990-01-01',    -- birthday
    'Dirección del SuperAdmin',  -- address
    'superadmin@magister.cl',    -- email
    'superadmin.personal@email.com',  -- personalEmail
    '987654321',     -- phone
    2024,            -- entry
    1,               -- group
    'Universidad de Tarapacá',  -- workPlace
    '987654321',     -- phoneWork
    'Super Administrador del Sistema',  -- job
    1                -- articulation
);

-- 2. Obtener el userID del usuario recién creado (phpMyAdmin lo mostrará)
-- 3. Asignar rol de SuperAdmin (reemplazar XXXX con el userID mostrado)
-- INSERT INTO `userHasRole` (`userID`, `roleID`) VALUES (XXXX, 1);

-- 4. Verificar que el usuario fue creado correctamente
SELECT 
    u.userID,
    u.rut,
    CONCAT(u.firstName, ' ', u.secondName, ' ', u.surname1, ' ', u.surname2) AS fullName,
    u.email,
    r.name AS role
FROM user u
JOIN userHasRole uhr ON u.userID = uhr.userID
JOIN role r ON uhr.roleID = r.roleID
WHERE u.email = 'superadmin@magister.cl';
