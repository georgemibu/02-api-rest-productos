
const productoModel = require('../models/producto');

function obtenerProductos(req, res) {
    const id = req.query.id;

    if (id !== undefined) {
        const idNumerico = Number(id);

        if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
            return res.status(400).json({
                error: 'Se requiere un ID válido'
            });
        }

        const producto = productoModel.obtenerPorId(idNumerico);

        if (!producto) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json(producto);
    }

    const productos = productoModel.obtenerTodos();

    return res.status(200).json(productos);
}

function crearProducto(req, res) {
    const datos = req.body;

    if (
        datos === null ||
        typeof datos !== 'object' ||
        Array.isArray(datos)
    ) {
        return res.status(400).json({
            error: 'Se espera un objeto JSON con nombre y precio'
        });
    }

    if (
        typeof datos.nombre !== 'string' ||
        datos.nombre.trim() === '' ||
        typeof datos.precio !== 'number' ||
        !Number.isFinite(datos.precio) ||
        datos.precio <= 0
    ) {
        return res.status(400).json({
            error: 'Nombre y precio válido son obligatorios'
        });
    }

    const nuevoProducto = productoModel.crear(
        datos.nombre.trim(),
        datos.precio
    );

    return res.status(201).json(nuevoProducto);
}

function actualizarProducto(req, res) {
    const id = Number(req.query.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'Se requiere un ID válido'
        });
    }

    const productoExistente = productoModel.obtenerPorId(id);

    if (!productoExistente) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }

    const datos = req.body;

    if (
        datos === null ||
        typeof datos !== 'object' ||
        Array.isArray(datos)
    ) {
        return res.status(400).json({
            error: 'Se espera un objeto JSON con nombre y precio'
        });
    }

    if (
        typeof datos.nombre !== 'string' ||
        datos.nombre.trim() === '' ||
        typeof datos.precio !== 'number' ||
        !Number.isFinite(datos.precio) ||
        datos.precio <= 0
    ) {
        return res.status(400).json({
            error: 'Nombre y precio válido son obligatorios'
        });
    }

    const productoActualizado = productoModel.actualizar(
        id,
        datos.nombre.trim(),
        datos.precio
    );

    return res.status(200).json(productoActualizado);
}

function eliminarProducto(req, res) {
    const id = Number(req.query.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'Se requiere un ID válido'
        });
    }

    const productoEliminado = productoModel.eliminar(id);

    if (!productoEliminado) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }

    return res.status(200).json({
        mensaje: 'Producto eliminado correctamente',
        producto: productoEliminado
    });
}

module.exports = {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
