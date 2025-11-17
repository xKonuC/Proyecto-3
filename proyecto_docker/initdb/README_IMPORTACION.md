# Instrucciones de Importación de Bases de Datos

## Problema Resuelto

Se corrigió el error **#1118 - Tamaño de línea muy grande** que ocurría al importar la base de datos `posgrado_db` en Docker/MySQL.

### ¿Qué causaba el error?

MySQL tiene un límite de 65535 bytes por fila (sin contar BLOBs). Las tablas `preprojectEvaluation` y `thesisEvaluation` tenían muchas columnas `VARCHAR(1000)` y `VARCHAR(2083)` que sumadas excedían este límite.

## Cambios Realizados

### 1. Archivo: `00-create-databases.sql` (NUEVO)
- Crea las bases de datos `authdb` y `posgrado_db` si no existen
- Se ejecuta primero por el prefijo `00-`

### 2. Archivo: `posgrado_db.sql` (MODIFICADO)
- **Cambio 1**: Se agregó `USE posgrado_db;` para seleccionar la base de datos correcta
- **Cambio 2**: Se convirtieron los siguientes tipos de datos a `TEXT`:
  - `VARCHAR(1000)` → `TEXT`
  - `VARCHAR(2083)` → `TEXT`
  - Cualquier `VARCHAR(500+)` → `TEXT`

**Tablas afectadas:**
- `preprojectEvaluation` (14 columnas cambiadas)
- `preprojectEvaluator` (8 columnas cambiadas)
- `thesisEvaluation` (varias columnas cambiadas)
- `thesisEvaluator` (1 columna cambiada)
- Otras tablas con URLs y campos grandes

### 3. Archivo: `authdb.sql` (SIN CAMBIOS)
- Ya tenía `USE authdb;`
- No presentaba problemas de tamaño de fila

## Archivos de Respaldo

- `posgrado_db.sql.backup` - Copia del archivo original antes de los cambios

## Cómo Usar

### Opción 1: Iniciar Docker desde cero

```bash
# 1. Detener los contenedores actuales
cd proyecto_docker
docker-compose down -v

# 2. Iniciar los contenedores (importará automáticamente)
docker-compose up -d

# 3. Verificar que las bases de datos se crearon
docker exec -it mysql_server mysql -uroot -pRoot123! -e "SHOW DATABASES;"
```

### Opción 2: Importar manualmente

Si el contenedor ya está corriendo:

```bash
# Importar authdb
docker exec -i mysql_server mysql -uroot -pRoot123! < initdb/authdb.sql

# Importar posgrado_db
docker exec -i mysql_server mysql -uroot -pRoot123! < initdb/posgrado_db.sql
```

### Opción 3: Usar phpMyAdmin

1. Acceder a http://localhost:8080
2. Usuario: `root`
3. Contraseña: `Root123!`
4. Importar cada archivo SQL desde la interfaz

## Verificación

Para verificar que todo se importó correctamente:

```bash
# Conectar a MySQL
docker exec -it mysql_server mysql -uroot -pRoot123!

# Verificar bases de datos
SHOW DATABASES;

# Verificar tablas de authdb
USE authdb;
SHOW TABLES;

# Verificar tablas de posgrado_db
USE posgrado_db;
SHOW TABLES;

# Salir
EXIT;
```

## Notas Técnicas

### ¿Por qué TEXT en lugar de VARCHAR?

- **VARCHAR** almacena longitud + datos en la fila → cuenta para el límite de 65535 bytes
- **TEXT** almacena un puntero de 9-12 bytes en la fila → los datos se almacenan separadamente
- **Rendimiento**: Para campos grandes (>500 caracteres), TEXT es más eficiente

### Diferencias entre VARCHAR y TEXT

| Característica | VARCHAR | TEXT |
|----------------|---------|------|
| Tamaño máximo | 65,535 caracteres | 65,535 caracteres |
| Almacenamiento | En la fila | Fuera de la fila |
| Índice completo | ✅ Sí | ❌ No (solo prefijos) |
| Valor por defecto | ✅ Sí | ❌ No |
| Uso recomendado | Campos cortos (<500) | Campos largos (>500) |

## Solución de Problemas

### Error: "Table already exists"

```bash
# Eliminar las tablas y volver a importar
docker exec -it mysql_server mysql -uroot -pRoot123! -e "DROP DATABASE IF EXISTS posgrado_db; DROP DATABASE IF EXISTS authdb;"
docker-compose restart mysql
```

### Error: "Access denied"

Verificar que la contraseña en `docker-compose.yml` sea `Root123!`

### Error de encoding

Los archivos SQL ya están configurados con `utf8mb4_unicode_ci`

## Contacto

Si encuentras algún problema, revisa:
1. Los logs del contenedor: `docker logs mysql_server`
2. Los logs de phpMyAdmin: `docker logs phpmyadmin`
3. Este archivo README

---
**Última actualización**: 16/10/2025
**Autor**: Asistente AI
**Estado**: ✅ Probado y funcional






