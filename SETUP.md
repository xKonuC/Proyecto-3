# 🚀 Guía de Configuración - Proyecto Magister

## 📋 Resumen del Proyecto

Este proyecto utiliza una arquitectura de microservicios con las siguientes tecnologías:
- **Frontend**: React (Vite) - Puerto 5173
- **Backend**: Node.js (Express) - Puerto 5000
- **AuthServer**: Node.js (Express) - Puerto 5001
- **FileServer**: Node.js (Express) - Puerto 5002
- **Base de Datos**: MySQL (Docker) - Puertos 3307 y 3308

## 🔧 Problemas Solucionados

### 1. Archivo .env Corrupto
- **Problema**: El archivo `authserver/.env` tenía formato corrupto con variables concatenadas
- **Solución**: Recreado con formato correcto y variables separadas

### 2. Configuración de Base de Datos
- **Problema**: Inconsistencias entre docker-compose y archivos .env
- **Solución**: Alineadas las configuraciones para usar:
  - Base de datos **posgrado_db** en puerto **3307** para datos operacionales
  - Base de datos **auth_db** en puerto **3308** para autenticación

### 3. Validación de Contraseñas
- **Problema**: Las validaciones de contraseña estaban comentadas en el authserver
- **Solución**: Descomentadas las validaciones para seguridad adecuada

### 4. Configuración CORS
- **Problema**: Variables de CORS no definidas correctamente
- **Solución**: Configuradas las variables ALLOW_DOMAIN1, ALLOW_DOMAIN2, ALLOW_DOMAIN3

## 🚀 Instrucciones de Inicio

### Opción 1: Script Automático (Recomendado)

**En Windows:**
```bash
start-services.bat
```

**En Linux/Mac:**
```bash
chmod +x start-services.sh
./start-services.sh
```

### Opción 2: Inicio Manual

1. **Iniciar Bases de Datos:**
```bash
docker-compose up -d
```

2. **Iniciar AuthServer:**
```bash
cd authserver
npm start
```

3. **Iniciar Backend:**
```bash
cd backend
npm start
```

4. **Iniciar FileServer:**
```bash
cd fileserver
npm start
```

5. **Iniciar Frontend:**
```bash
cd frontend
npm start
```

## 🌐 URLs de Servicios

| Servicio | URL | Puerto | Descripción |
|----------|-----|--------|-------------|
| Frontend | http://localhost:5173 | 5173 | Interfaz de usuario |
| Backend | http://localhost:5000 | 5000 | API principal |
| AuthServer | http://localhost:5001 | 5001 | Servicio de autenticación |
| FileServer | http://localhost:5002 | 5002 | Gestión de archivos |
| BD Posgrado | localhost:3307 | 3307 | Base de datos operacional |
| BD Auth | localhost:3308 | 3308 | Base de datos de autenticación |

## 🗄️ Configuración de Base de Datos

### Base de Datos Operacional (posgrado_db)
- **Host**: localhost
- **Puerto**: 3307
- **Usuario**: posgrado
- **Contraseña**: posgrado_password
- **Base de datos**: posgrado_db

### Base de Datos de Autenticación (auth_db)
- **Host**: localhost
- **Puerto**: 3308
- **Usuario**: auth
- **Contraseña**: auth_password
- **Base de datos**: auth_db

## 🔐 Flujo de Autenticación

1. **Frontend** envía credenciales a **Backend** (`/api/authCases/signinWithEmail`)
2. **Backend** reenvía las credenciales a **AuthServer** (`/email/login`)
3. **AuthServer** valida contra ambas bases de datos:
   - `userAccount` (auth_db) - para credenciales
   - `user` (posgrado_db) - para datos de usuario
4. **AuthServer** retorna token JWT encriptado
5. **Backend** desencripta y retorna respuesta al **Frontend**

## 🛠️ Comandos Útiles

### Ver logs de Docker:
```bash
docker-compose logs -f
```

### Reiniciar servicios:
```bash
docker-compose restart
```

### Detener servicios:
```bash
docker-compose down
```

### Verificar estado de servicios:
```bash
docker-compose ps
```

## ⚠️ Notas Importantes

1. **Espera**: Después de iniciar Docker, espera 10-15 segundos para que las bases de datos estén completamente listas
2. **Puertos**: Asegúrate de que los puertos 3307, 3308, 5000, 5001, 5002 y 5173 estén disponibles
3. **Variables de entorno**: Todos los archivos .env han sido corregidos y configurados
4. **CORS**: Configurado para permitir conexiones desde localhost en los puertos comunes

## 🐛 Solución de Problemas

### Error de conexión a base de datos:
- Verifica que Docker esté ejecutándose
- Espera más tiempo para que las bases de datos se inicialicen
- Revisa los logs con `docker-compose logs`

### Error de CORS:
- Verifica que las URLs en el frontend coincidan con las configuradas en CORS
- Asegúrate de que el puerto del frontend sea 5173

### Error de autenticación:
- Verifica que el usuario exista en ambas bases de datos
- Revisa que la contraseña esté correctamente hasheada en la base de datos auth_db

## 📝 Estructura del Proyecto

```
Magister-P3/
├── authserver/          # Servicio de autenticación
├── backend/             # API principal
├── frontend/            # Interfaz React
├── fileserver/          # Gestión de archivos
├── authdb/              # Backup BD autenticación
├── opsdb/               # Backup BD operacional
└── docker-compose.yml   # Configuración Docker
```

¡Tu proyecto debería estar funcionando correctamente ahora! 🎉










