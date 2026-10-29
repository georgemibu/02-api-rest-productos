const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

//Consultar todos los productos o uno por id
router.get('/', productosController.obtenerProductos) ;

//crear producto
router.post('/', productosController.crearProducto);

//Actualizar producto
router.put('/', productosController.actualizarProducto);

//Eliminar producto
router.delete('/', productosController.eliminarProducto);


module.exports = router;