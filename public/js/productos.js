const tablaProductos = document.querySelector('#lista-productos');
const estadoCatalogo = document.querySelector('#estado-catalogo');

function agregarCelda(fila, valor) {
  const celda = document.createElement('td');
  celda.textContent = valor;
  fila.append(celda);
}

async function cargarProductos() {
  estadoCatalogo.textContent = 'Cargando productos…';
  estadoCatalogo.className = 'mensaje';

  try {
    const respuesta = await fetch('/api/productos');
    const datos = await respuesta.json();
    if (!respuesta.ok) {
      throw new Error(datos.mensaje || 'No fue posible consultar los productos.');
    }

    tablaProductos.replaceChildren();
    for (const producto of datos) {
      const fila = document.createElement('tr');
      agregarCelda(fila, producto.nombre);
      agregarCelda(fila, producto.categoria);
      agregarCelda(fila, `₡${Number(producto.precio).toLocaleString('es-CR')}`);
      agregarCelda(fila, producto.stock);
      tablaProductos.append(fila);
    }

    estadoCatalogo.textContent = `${datos.length} producto(s) cargados correctamente.`;
    estadoCatalogo.classList.add('exito');
  } catch (error) {
    tablaProductos.replaceChildren();
    estadoCatalogo.textContent = error.message || 'Ocurrió un error al consultar los productos.';
    estadoCatalogo.classList.add('error');
  }
}

document.querySelector('#actualizar-productos').addEventListener('click', cargarProductos);
cargarProductos();