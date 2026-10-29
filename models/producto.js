
const db = require('../config/database');

function obtenerTodos() {
    return db.prepare(
        'SELECT * FROM productos'
    ).all();
}

function obtenerPorId(id) {
    return db.prepare(
        'SELECT * FROM productos WHERE id = ?'
    ).get(id);
}

function crear(nombre, precio) {
    const resultado = db.prepare(
        'INSERT INTO productos (nombre, precio) VALUES (?, ?)'
    ).run(nombre, precio);

    return obtenerPorId(Number(resultado.lastInsertRowid));
}

function actualizar(id, nombre, precio) {
    db.prepare(
        'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?'
    ).run(nombre, precio, id);

    return obtenerPorId(id);
}

function eliminar(id) {
    const producto = obtenerPorId(id);

    if (!producto) {
        return null;
    }

    db.prepare(
        'DELETE FROM productos WHERE id = ?'
    ).run(id);

    return producto;
}

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};
