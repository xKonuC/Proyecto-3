🚀 Proyecto 3 – Configuración con Docker

Este proyecto utiliza Docker y Docker Compose para levantar un entorno de desarrollo que incluye dos bases de datos separadas:

authdb: base de datos de autenticación y usuarios.

opsdb (posgrado_db): base de datos operativa del sistema (posgrados u operaciones principales).

📦 Requisitos previos

Antes de iniciar, asegúrate de tener instalados los siguientes componentes:

# Verificar si Docker está instalado
docker --version

# Verificar si Docker Compose está disponible
docker compose version


Si no están instalados:

🔹 Windows / macOS: Descargar Docker Desktop

🔹 Linux (Ubuntu):

sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker

⚙️ Estructura del proyecto
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

🧩 Descripción de las bases de datos
🗄️ authdb

Contiene información de usuarios, roles y tokens.

Configuración típica con PostgreSQL o MySQL.

Archivos .sql inicializan las tablas de autenticación.

🗃️ opsdb (posgrado_db)

Contiene datos académicos y administrativos.

Relaciona programas, estudiantes y registros operativos.

Puede incluir relaciones con authdb mediante claves externas.

🐳 Comandos principales de Docker
1. Construir las imágenes
docker compose build

2. Levantar los contenedores
docker compose up -d

3. Ver logs en tiempo real
docker compose logs -f

4. Detener los servicios
docker compose down

5. Acceder a una base de datos dentro del contenedor
# Para authdb
docker exec -it authdb bash
psql -U usuario -d authdb

# Para opsdb
docker exec -it opsdb bash
psql -U usuario -d posgrado_db

🧱 Variables de entorno (ejemplo)

En un archivo .env (ubicado junto a tu docker-compose.yml):

POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
AUTH_DB=authdb
OPS_DB=posgrado_db

✅ Puesta en marcha rápida
# Clonar el repositorio
git clone https://github.com/tuusuario/Proyecto-3.git
cd Proyecto-3

# Construir y levantar servicios
docker compose up -d


Una vez iniciado, verifica el estado:

docker ps


Deberías ver los contenedores authdb y opsdb corriendo.
