
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const rutaBaseDatos = path.join(__dirname, '..', 'productos.db');

const db = new DatabaseSync(rutaBaseDatos);

db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL CHECK (precio > 0)
    );
`);



console.log('Conexión con SQLite correcta');
console.log('Tabla productos preparada');


const cantidadProductos = db.prepare(
    'SELECT COUNT(*) AS cantidad FROM productos'
).get();

if (cantidadProductos.cantidad === 0) {
    const insertarProducto = db.prepare(
        'INSERT INTO productos (nombre, precio) VALUES (?, ?)'
    );

    insertarProducto.run('Teclado', 25000);
    insertarProducto.run('Mouse', 12000);

    console.log('Productos iniciales cargados');
}



module.exports = db;
