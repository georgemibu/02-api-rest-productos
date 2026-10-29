const express = require ('express');
const productosRouter = require('./routes/productos');



const app = express();



const config = require('./config/config');
if(config.environment === 'development'){
    console.log('La API se está ejecutando en modo desarrollo');
}


const PORT = config.port;

//middleware para interpretar cuerpos JSON
app.use(express.json());
app.use('/productos', productosRouter);

/*datos iniciales en memoria
const productos = [
    {id:1, nombre: 'teclado', precio: 25000},
    {id:2, nombre: 'Mouse', precio: 12000}
];*/

//primera ruta
/*
app.get('/productos', (req, res)=>{
    const id = req.query.id;

    if (id != undefined){
        const idNumerico = Number(id);

        if (!Number.isInteger(idNumerico) || idNumerico <= 0 ){
            return res.status(400).json({
                error: 'Se requiere un ID válido'
            });
        }

        const producto = productos.find(p => p.id === idNumerico);

        if (!producto){
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json(producto);
    }

    return res.status(200).json(productos);
});
*/
/*
app.post('/productos', (req, res) =>{
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

    if(
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

    const nuevoProducto = {
        id: Math.max(0, ...productos.map(p => p.id)) + 1,
        nombre: datos.nombre.trim(),
        precio: datos.precio
    };

    productos.push(nuevoProducto);

    return res.status(201).json(nuevoProducto);
})
*/
/*
app.put('/productos', (req, res) =>{
    const id = Number(req.query.id);

    if (!Number.isInteger(id) || id <=0) {
        return res.status(400).json({
            error: 'Se requiere un ID válido'
        });
    }

    const producto = productos.find(p => p.id === id);

    if (!producto) {
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
    ){
        return res.status(400).json({
            error: 'Nombre y precio válido son obligatorios'
        });
    }

    producto.nombre = datos.nombre.trim();
    producto.precio = datos.precio;

    return res.status(200).json(producto);

})
*/

app.delete('/productos', (req, res) =>{
    const id = Number(req.query.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'Se requiere un ID válido'
        });
    }

    const indice = productos.findIndex(p => p.id === id);

    if (indice === -1){
        return res.status(404).json({
            error: 'Producto no encontrado'
        });
    }

    const productoEliminado = productos.splice(indice, 1)[0];

    return res.status(200).json({
        mensaje: 'Producto eliminado correctamente',
        producto: productoEliminado
    });

})



//consultar todos los productos
app.get('/productos', (req, res) =>{
    res.json(productos);
});

//iniciar servidor
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})