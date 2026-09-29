const express = require('express');
const {
  leerProductos,
  escribirProductos,
  siguienteId
} = require('../services/productosService');

const router = express.Router();
const camposProducto = ['nombre', 'categoria', 'precio', 'stock'];

function validarProducto(producto) {
  if (!producto || typeof producto !== 'object' || Array.isArray(producto)) {
    return 'El cuerpo de la solicitud debe ser un objeto JSON.';
  }

  for (const campo of camposProducto) {
    if (producto[campo] === undefined || producto[campo] === null || producto[campo] === '') {
      return `El campo ${campo} es obligatorio.`;
    }
  }

  if (typeof producto.nombre !== 'string' || !producto.nombre.trim()) {
    return 'El nombre debe contener texto.';
  }

  if (typeof producto.categoria !== 'string' || !producto.categoria.trim()) {
    return 'La categoría debe contener texto.';
  }

  if (typeof producto.precio !== 'number' || !Number.isFinite(producto.precio) || producto.precio <= 0) {
    return 'El precio debe ser numérico y mayor que cero.';
  }

  if (!Number.isInteger(producto.stock) || producto.stock < 0) {
    return 'El stock debe ser un número entero mayor o igual que cero.';
  }

  return null;
}

function convertirId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function responderError(res, error) {
  console.error(error);
  return res.status(500).json({ mensaje: 'Ocurrió un error interno al procesar la solicitud.' });
}

router.get('/', async (req, res) => {
  try {
    const productos = await leerProductos();
    return res.status(200).json(productos);
  } catch (error) {
    return responderError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = convertirId(req.params.id);
    if (id === null) {
      return res.status(404).json({ mensaje: 'No se encontró el producto solicitado.' });
    }

    const productos = await leerProductos();
    const producto = productos.find((elemento) => elemento.id === id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'No se encontró el producto solicitado.' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return responderError(res, error);
  }
});

router.post('/', async (req, res) => {
  const errorValidacion = validarProducto(req.body);
  if (errorValidacion) {
    return res.status(400).json({ mensaje: errorValidacion });
  }

  try {
    const productos = await leerProductos();
    const producto = {
      id: siguienteId(productos),
      nombre: req.body.nombre.trim(),
      categoria: req.body.categoria.trim(),
      precio: req.body.precio,
      stock: req.body.stock
    };

    productos.push(producto);
    await escribirProductos(productos);
    return res.status(201).json({ mensaje: 'Producto registrado correctamente.', producto });
  } catch (error) {
    return responderError(res, error);
  }
});

router.put('/:id', async (req, res) => {
  const errorValidacion = validarProducto(req.body);
  if (errorValidacion) {
    return res.status(400).json({ mensaje: errorValidacion });
  }

  try {
    const id = convertirId(req.params.id);
    const productos = await leerProductos();
    const indice = productos.findIndex((producto) => producto.id === id);
    if (id === null || indice === -1) {
      return res.status(404).json({ mensaje: 'No se encontró el producto solicitado.' });
    }

    const producto = {
      id,
      nombre: req.body.nombre.trim(),
      categoria: req.body.categoria.trim(),
      precio: req.body.precio,
      stock: req.body.stock
    };

    productos[indice] = producto;
    await escribirProductos(productos);
    return res.status(200).json({ mensaje: 'Producto actualizado correctamente.', producto });
  } catch (error) {
    return responderError(res, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = convertirId(req.params.id);
    const productos = await leerProductos();
    const indice = productos.findIndex((producto) => producto.id === id);
    if (id === null || indice === -1) {
      return res.status(404).json({ mensaje: 'No se encontró el producto solicitado.' });
    }

    const [producto] = productos.splice(indice, 1);
    await escribirProductos(productos);
    return res.status(200).json({ mensaje: 'Producto eliminado correctamente.', producto });
  } catch (error) {
    return responderError(res, error);
  }
});

module.exports = router;