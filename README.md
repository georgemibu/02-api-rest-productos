# API REST de Productos

API REST desarrollada con **Node.js, Express y SQLite** para gestionar un catálogo de productos. Implementa las operaciones CRUD (Create, Read, Update, Delete), validaciones de datos y persistencia mediante una base de datos local.

Este proyecto forma parte de mi portfolio de desarrollo backend y tiene como objetivo poner en práctica los fundamentos de diseño y construcción de APIs REST.

## Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para construir el servidor HTTP y gestionar las rutas.
- **SQLite:** base de datos relacional para almacenar los productos de forma persistente.
- **node:sqlite:** módulo integrado de Node.js utilizado para interactuar con SQLite.
- **Postman:** herramienta utilizada para probar los endpoints.

## Funcionalidades

- Consultar todos los productos.
- Consultar un producto por su ID.
- Crear productos.
- Actualizar productos existentes.
- Eliminar productos.
- Validar los datos recibidos en las peticiones.
- Gestionar respuestas HTTP y errores.
- Persistir los datos entre reinicios del servidor.
- Crear automáticamente la tabla y cargar productos iniciales cuando la base de datos está vacía.

## Estructura del proyecto

```text
02-api-rest-productos/
├── config/
│   ├── config.js
│   └── database.js
├── controllers/
│   └── productosController.js
├── models/
│   └── producto.js
├── routes/
│   └── productos.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

La base de datos `productos.db` se genera localmente al iniciar la aplicación y está excluida del repositorio.

## Requisitos previos

- Node.js 22 o una versión compatible con el módulo integrado `node:sqlite`.
- npm.
- Postman o una herramienta equivalente para probar la API.

> **Nota:** `node:sqlite` puede mostrar una advertencia indicando que es experimental en algunas versiones de Node.js. Esto no necesariamente impide el funcionamiento de la aplicación.

## Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta del proyecto:

```bash
cd 02-api-rest-productos
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`:

```env
PORT=3000
NODE_ENV=development
```

## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

Por defecto, la API estará disponible en:

`http://localhost:3000`

Al iniciar la aplicación, se prepara automáticamente la base de datos SQLite y se crea la tabla `productos` si todavía no existe.

Si la tabla está vacía, se insertan dos productos iniciales de ejemplo.

## Endpoints

Todos los endpoints utilizan la ruta base `/productos`.

| Método | Endpoint | Descripción | Respuesta esperada |
|---|---|---|---|
| GET | `/productos` | Obtener todos los productos | `200 OK` |
| GET | `/productos?id=1` | Obtener un producto por ID | `200 OK` |
| POST | `/productos` | Crear un producto | `201 Created` |
| PUT | `/productos?id=1` | Actualizar un producto | `200 OK` |
| DELETE | `/productos?id=1` | Eliminar un producto | `200 OK` |

## Ejemplos de uso

### Consultar productos

```http
GET http://localhost:3000/productos
```

Para consultar un producto específico:

```http
GET http://localhost:3000/productos?id=1
```

### Crear un producto

```http
POST http://localhost:3000/productos
Content-Type: application/json
```

Cuerpo JSON:

```json
{
  "nombre": "Monitor",
  "precio": 150000
}
```

La respuesta incluye el producto creado y su ID.

### Actualizar un producto

```http
PUT http://localhost:3000/productos?id=1
Content-Type: application/json
```

Cuerpo JSON:

```json
{
  "nombre": "Teclado mecánico",
  "precio": 45000
}
```

La operación reemplaza el nombre y el precio del producto indicado.

### Eliminar un producto

```http
DELETE http://localhost:3000/productos?id=1
```

La respuesta informa que el producto fue eliminado y devuelve los datos del registro eliminado.

## Validaciones y manejo de errores

La API valida los datos recibidos antes de realizar las operaciones.

- El ID debe ser un número entero positivo.
- El nombre es obligatorio y no puede estar vacío.
- El precio debe ser numérico, finito y mayor que cero.
- El cuerpo de las peticiones de creación y actualización debe contener un objeto JSON válido.
- No se puede consultar, actualizar ni eliminar un producto inexistente.

Entre los códigos HTTP utilizados se encuentran:

| Código | Significado |
|---|---|
| `200` | Operación realizada correctamente. |
| `201` | Recurso creado correctamente. |
| `400` | Petición inválida o datos incorrectos. |
| `404` | Producto no encontrado. |

## Persistencia de datos

Los productos se almacenan en una base de datos SQLite local llamada `productos.db`.

A diferencia de un arreglo en memoria, los registros permanecen guardados después de detener y reiniciar el servidor.

El archivo de la base de datos está excluido de Git para evitar subir datos locales de desarrollo. La aplicación crea la estructura de la base de datos automáticamente al iniciarse.

## Arquitectura

El proyecto separa las responsabilidades en distintas capas:

- **Routes:** definen los endpoints y los métodos HTTP disponibles.
- **Controllers:** reciben las peticiones, validan los datos y construyen las respuestas.
- **Models:** encapsulan las consultas y operaciones sobre los productos.
- **Config:** centraliza la configuración de la aplicación y la conexión a la base de datos.
- **Server:** configura Express e inicia el servidor HTTP.

Esta organización facilita el mantenimiento y permite ampliar el proyecto sin concentrar toda la lógica en un único archivo.

## Pruebas

Los endpoints CRUD fueron probados manualmente con Postman. Se verificaron las operaciones de consulta, creación, actualización y eliminación, así como la persistencia de los datos después de reiniciar el servidor.

## Aprendizajes

Este proyecto permitió practicar:

- Diseño de una API REST.
- Uso de métodos HTTP y códigos de estado.
- Separación de rutas, controladores y modelos.
- Validación de entradas y manejo de errores.
- Consultas SQL parametrizadas.
- Integración de SQLite con Node.js.
- Persistencia de datos.
- Configuración mediante variables de entorno.
- Pruebas de endpoints con Postman.

## Próximas mejoras

- Incorporar pruebas automatizadas.
- Añadir paginación y filtros de búsqueda.
- Implementar autenticación y autorización.
- Incorporar documentación interactiva con Swagger/OpenAPI.
- Evaluar una migración a una base de datos servidor cuando el proyecto lo requiera.

## Autor

Proyecto personal desarrollado como parte de un recorrido de aprendizaje en desarrollo backend.

