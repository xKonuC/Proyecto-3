# Configuración Docker del Proyecto

Este directorio contiene la configuración Docker para todo el proyecto.

## Estructura del Proyecto

- **authserver**: Servidor de autenticación (Puerto 5001)
- **backend**: API principal (Puerto 5000)
- **fileserver**: Servidor de archivos (Puerto 5002)
- **frontend**: Aplicación React (Puerto 5173)
- **mysql**: Base de datos MySQL (Puerto 3307)
- **phpmyadmin**: Interfaz web para MySQL (Puerto 8080)

## Comandos Docker

### Iniciar todos los servicios
```bash
cd proyecto_docker
docker-compose up -d
```

### Ver logs de todos los servicios
```bash
docker-compose logs -f
```

### Ver logs de un servicio específico
```bash
docker-compose logs -f authserver
docker-compose logs -f backend
docker-compose logs -f fileserver
docker-compose logs -f frontend
```

### Detener todos los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes
```bash
docker-compose down -v
```

### Reconstruir servicios
```bash
docker-compose up --build -d
```

## URLs de Acceso

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Auth Server**: http://localhost:5001
- **File Server**: http://localhost:5002
- **phpMyAdmin**: http://localhost:8080

## Configuración de Base de Datos

- **Host**: mysql (dentro del contenedor)
- **Puerto**: 3306 (interno), 3307 (externo)
- **Usuario**: root
- **Contraseña**: Root123!
- **Base de datos**: authdb

## Variables de Entorno

Cada servicio tiene su archivo `.env.development` con las configuraciones específicas para Docker:

- `backend/.env.development`
- `authserver/.env.development`
- `fileserver/.env.development`
- `frontend/.env.development`

## Red Docker

Todos los servicios están conectados a la red `app_network` para permitir la comunicación entre contenedores.

## Volúmenes

- **mysql_data**: Persistencia de datos de MySQL
- **fileserver/uploads**: Archivos subidos al servidor de archivos

## Desarrollo

Para desarrollo, todos los servicios usan los Dockerfiles de desarrollo (`.dev`) que incluyen hot-reload y herramientas de desarrollo.





