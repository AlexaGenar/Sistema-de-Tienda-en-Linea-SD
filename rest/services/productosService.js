const fs = require('fs/promises');
const path = require('path');

const rutaArchivo = path.join(__dirname, '..', 'data', 'productos.txt');

async function leerProductos() {
  const contenido = await fs.readFile(rutaArchivo, 'utf8');
  return JSON.parse(contenido);
}

async function escribirProductos(productos) {
  await fs.writeFile(rutaArchivo, `${JSON.stringify(productos, null, 2)}\n`, 'utf8');
}

function siguienteId(productos) {
  return productos.reduce((mayor, producto) => Math.max(mayor, producto.id), 0) + 1;
}

module.exports = { leerProductos, escribirProductos, siguienteId };