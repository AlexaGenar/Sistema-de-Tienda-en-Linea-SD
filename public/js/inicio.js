const estadoProductos = document.querySelector('#estado-productos');
const cantidadProductos = document.querySelector('#cantidad-productos');

async function cargarCantidadProductos() {
  estadoProductos.textContent = 'Cargando cantidad de productos…';
  estadoProductos.className = 'mensaje';

  try {
    const respuesta = await fetch('/api/productos');
    const datos = await respuesta.json();
    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible consultar los productos.');
    }

    cantidadProductos.textContent = datos.length;
    estadoProductos.textContent = 'Cantidad actualizada desde el servicio REST.';
    estadoProductos.classList.add('exito');
  } catch (error) {
    cantidadProductos.textContent = '—';
    estadoProductos.textContent = error.message || 'Ocurrió un error al consultar los productos.';
    estadoProductos.classList.add('error');
  }
}

cargarCantidadProductos();