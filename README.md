![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)

🚀 Proyecto 3 – Configuración con Docker

Este proyecto utiliza Docker y Docker Compose para levantar un entorno de desarrollo que incluye dos bases de datos separadas:

🧩 authdb: base de datos de autenticación y gestión de usuarios.

🧩 opsdb (posgrado_db): base de datos operativa y académica principal del sistema.

📦 Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

# Verificar instalación
docker --version
docker compose version


Si no los tienes instalados:

Windows / macOS: Descargar Docker Desktop

Linux (Ubuntu):

sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker


🧱 Estructura del proyecto
Proyecto-3/
│
├── docker-compose.yml
├── authdb/              # Base de datos de autenticación
│   ├── Dockerfile
│   └── scripts.sql
│
└── opsdb/ (posgrado_db) # Base de datos principal del sistema
    ├── Dockerfile
    └── data.sql

⚙️ Descripción de las bases de datos
🗄️ authdb

Contiene información de usuarios, roles, permisos y tokens.

Se inicializa desde scripts.sql.

Ideal para manejar autenticación centralizada y control de acceso.

🗃️ opsdb (posgrado_db)

Contiene la información operativa o académica del sistema.

Se inicializa desde data.sql.

Puede relacionarse con authdb mediante claves externas o vistas compartidas.

🐳 Comandos principales de Docker
1️⃣ Construir las imágenes
docker compose build

2️⃣ Levantar los contenedores
docker compose up -d

3️⃣ Ver logs en tiempo real
docker compose logs -f

4️⃣ Detener los servicios
docker compose down

5️⃣ Acceder a una base de datos dentro del contenedor
# Para authdb
docker exec -it authdb bash
psql -U usuario -d authdb

# Para opsdb
docker exec -it opsdb bash
psql -U usuario -d posgrado_db

🔧 Variables de entorno (.env)

Crea un archivo .env junto al docker-compose.yml con el siguiente contenido:

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
AUTH_DB=authdb
OPS_DB=posgrado_db

🚀 Puesta en marcha rápida
# Clonar el repositorio
git clone https://github.com/tuusuario/Proyecto-3.git
cd Proyecto-3

# Construir y levantar servicios
docker compose up -d


Verifica el estado de los contenedores:

docker ps


Deberías ver los contenedores:

authdb

opsdb

corriendo correctamente ✅

🧩 Notas adicionales

Puedes modificar los archivos .sql para personalizar los datos iniciales.

Si cambias los nombres de los servicios, recuerda actualizarlos también en el docker-compose.yml.

Para limpiar los contenedores e imágenes:

docker compose down --volumes --rmi all
