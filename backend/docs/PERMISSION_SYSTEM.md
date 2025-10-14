# Sistema de Permisos Jerárquico

## Descripción General

El sistema de permisos implementa una jerarquía de roles donde cada rol tiene permisos específicos y limitados según su nivel de autoridad.

## Jerarquía de Roles

### 1. SuperAdmin (ID: 1)
- **Máximo privilegio** - Puede hacer todo en el sistema
- **Permisos completos:**
  - ✅ Gestionar usuarios
  - ✅ Gestionar roles (incluyendo SuperAdmin)
  - ✅ Gestionar sistema
  - ✅ Gestionar contenido académico
  - ✅ Gestionar egresados
  - ✅ Ver todos los datos
  - ✅ Eliminar usuarios
  - ✅ Modificar configuraciones del sistema

### 2. Administrador (ID: 2)
- **Puede gestionar usuarios y contenido, pero con limitaciones**
- **Permisos:**
  - ✅ Gestionar usuarios
  - ❌ Gestionar roles de SuperAdmin
  - ❌ Gestionar sistema
  - ✅ Gestionar contenido académico
  - ✅ Gestionar egresados
  - ✅ Ver todos los datos
  - ❌ Eliminar usuarios
  - ❌ Modificar configuraciones del sistema
- **Roles que puede asignar:** Administrador, Académico, Estudiante, Egresado

### 3. Académico (ID: 3)
- **Puede evaluar y gestionar contenido académico**
- **Permisos:**
  - ❌ Gestionar usuarios
  - ❌ Gestionar roles
  - ❌ Gestionar sistema
  - ✅ Gestionar contenido académico
  - ❌ Gestionar egresados
  - ❌ Ver todos los datos
  - ❌ Eliminar usuarios
  - ❌ Modificar configuraciones del sistema
- **Roles que puede asignar:** Ninguno

### 4. Estudiante (ID: 4)
- **Acceso limitado a sus propios datos**
- **Permisos:**
  - ❌ Gestionar usuarios
  - ❌ Gestionar roles
  - ❌ Gestionar sistema
  - ❌ Gestionar contenido académico
  - ❌ Gestionar egresados
  - ❌ Ver todos los datos
  - ❌ Eliminar usuarios
  - ❌ Modificar configuraciones del sistema
  - ✅ Solo acceder a sus propios datos

### 5. Egresado (ID: 5)
- **Acceso muy limitado**
- **Permisos:**
  - ❌ Gestionar usuarios
  - ❌ Gestionar roles
  - ❌ Gestionar sistema
  - ❌ Gestionar contenido académico
  - ❌ Gestionar egresados
  - ❌ Ver todos los datos
  - ❌ Eliminar usuarios
  - ❌ Modificar configuraciones del sistema
  - ✅ Solo acceder a sus propios datos
  - ✅ Ver reportes de egresados

## Middlewares de Protección

### 1. `verifyRoleHierarchy(permission)`
Verifica si el usuario tiene el permiso específico requerido.

```javascript
// Ejemplo de uso
roleRoute.use('/administrator', verifyRoleHierarchy('canManageUsers'), administratorRoute);
```

### 2. `protectRoleAssignment`
Protege la asignación de roles:
- SuperAdmin puede asignar cualquier rol
- Administrador no puede asignar SuperAdmin
- Otros roles no pueden asignar roles

### 3. `protectUserDeletion`
Protege la eliminación de usuarios:
- Solo SuperAdmin puede eliminar usuarios

### 4. `protectSystemSettings`
Protege la modificación de configuraciones:
- Solo SuperAdmin puede modificar configuraciones del sistema

### 5. `protectSensitiveData`
Protege el acceso a datos sensibles:
- SuperAdmin y Administrador pueden ver todos los datos
- Otros roles solo pueden ver sus propios datos

## Endpoints de Información

### GET `/role/administrator/userPermissions`
Obtiene los permisos del usuario actual.

**Respuesta:**
```json
{
  "userID": 1,
  "userRole": "SuperAdmin",
  "userRoleID": 1,
  "permissions": {
    "canManageUsers": true,
    "canManageRoles": true,
    "canManageSystem": true,
    "canManageAcademic": true,
    "canManageGraduates": true,
    "canViewAllData": true,
    "canDeleteUsers": true,
    "canModifySystemSettings": true,
    "allowedRoles": [1, 2, 3, 4, 5]
  },
  "availablePermissions": ["canManageUsers", "canManageRoles", ...],
  "hierarchy": {
    "1": "SuperAdmin",
    "2": "Administrador",
    "3": "Académico",
    "4": "Estudiante",
    "5": "Egresado"
  }
}
```

### GET `/role/administrator/roleHierarchy`
Obtiene información sobre la jerarquía de roles y permisos.

**Respuesta:**
```json
{
  "hierarchy": {
    "1": "SuperAdmin",
    "2": "Administrador",
    "3": "Académico",
    "4": "Estudiante",
    "5": "Egresado"
  },
  "permissions": {
    "SuperAdmin": { "canManageUsers": true, ... },
    "Administrador": { "canManageUsers": true, ... },
    ...
  },
  "description": {
    "SuperAdmin": "Máximo privilegio - Puede hacer todo en el sistema",
    "Administrador": "Puede gestionar usuarios y contenido, pero no puede asignar SuperAdmin",
    ...
  }
}
```

## Implementación en Rutas

### Rutas Protegidas por Jerarquía
```javascript
// Rutas con verificación jerárquica de permisos
roleRoute.use('/administrator', verifyRoleHierarchy('canManageUsers'), administratorRoute);
roleRoute.use('/academic', verifyRoleHierarchy('canManageAcademic'), academicRoute);
roleRoute.use('/student', verifyRoleHierarchy('canOnlyAccessOwnData'), studentRoute);
roleRoute.use('/graduate', verifyRoleHierarchy('canManageGraduates'), graduateRoute);

// Rutas específicas para SuperAdmin
roleRoute.use('/superadmin', verifySuperAdmin, administratorRoute);
```

### Rutas con Protección Específica
```javascript
// Asignación de roles con protección
userHasRoleRoute.post(
  protectRoleAssignment,
  validateAllowedRoles,
  validateUserID,
  validateArrayRoleID,
  createUserHasRole
);

// Eliminación de usuarios con protección
userRoute.delete(
  protectUserDeletion,
  validateArrayUserID,
  deleteUser
);
```

## Seguridad

1. **Verificación de Token:** Todos los endpoints requieren un token válido
2. **Verificación de Rol:** Se verifica el rol más alto del usuario
3. **Verificación de Permisos:** Se verifica que el usuario tenga el permiso específico
4. **Protección de Datos:** Los usuarios solo pueden acceder a datos permitidos
5. **Protección de Acciones:** Las acciones sensibles están protegidas por middlewares específicos

## Casos de Uso

### SuperAdmin
- Puede hacer cualquier acción en el sistema
- Puede asignar y revocar cualquier rol
- Puede eliminar usuarios
- Puede modificar configuraciones del sistema

### Administrador
- Puede gestionar usuarios (excepto SuperAdmin)
- Puede asignar roles (excepto SuperAdmin)
- No puede eliminar usuarios
- No puede modificar configuraciones del sistema

### Académico
- Puede gestionar contenido académico
- No puede gestionar usuarios
- No puede asignar roles
- Solo puede acceder a sus propios datos

### Estudiante/Egresado
- Acceso muy limitado
- Solo pueden acceder a sus propios datos
- No pueden realizar acciones administrativas
