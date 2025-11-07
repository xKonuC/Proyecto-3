# Proyecto-3  
**Sistema de magíster de la Universidad de Tarapacá**

---

## Tabla de Contenidos
- [1. Clonar el Repositorio](#1-clonar-el-repositorio)
- [2. Instalar dependencias](#2-instalar-dependencias)
- [3. Ejecución del proyecto](#3-ejecución-del-proyecto)
  - [3.1 Modo desarrollador](#31-modo-desarrollador)
  - [3.2 Modo producción](#32-modo-producción)

---

## 1. Clonar el Repositorio

```bash
git clone https://github.com/xKonuC/Proyecto-3.git 
cd Proyecto-3 
git switch jota
```

---

## 2. Instalar dependencias

```bash
cd authserver && npm install 
cd backend && npm install 
cd fileserver && npm install 
cd frontend && npm install
cd ..
```

---

## 3. Ejecución del proyecto

> Los scripts en `initdb/` crean automáticamente las bases de datos **`authdb`** y **`posgrado_db`**.

```
proyecto_docker/
├── docker-compose.yml         # Producción
└── docker-compose.dev.yml     # Desarrollo
```

---

### 3.1 Modo desarrollador

```bash
cd proyecto_docker && docker compose -f docker-compose.dev.yml up -d
```

Levanta: **MySQL** + **phpMyAdmin**

Luego, en **terminales separadas**:

```bash
cd authserver && npm run dev 
cd backend && npm run dev 
cd fileserver && npm run dev
cd frontend && npm run dev
```

> Estos scripts "dev" usa `.env.local` para variables de desarrollo.

---

### 3.2 Modo producción

```bash
cd proyecto_docker && docker compose -f docker-compose.yml up -d
```

Levanta **todos los servicios en contenedores**:
- `mysql`
- `phpMyAdmin`
- `authserver`
- `backend`
- `fileserver`
- `frontend`

> Usa `.env` para variables de producción.

---

*Última actualización: 06 de noviembre de 2025*
```
```