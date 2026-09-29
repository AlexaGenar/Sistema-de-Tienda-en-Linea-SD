const formularioProducto = document.querySelector('#formulario-producto');
const tablaGestion = document.querySelector('#tabla-gestion');
const estadoGestion = document.querySelector('#estado-gestion');
const botonGuardar = document.querySelector('#guardar-producto');
const botonCancelar = document.querySelector('#cancelar-edicion');
let idEnEdicion = null;

function mostrarEstado(mensaje, tipo = '') {
  estadoGestion.textContent = mensaje;
  estadoGestion.className = `mensaje ${tipo}`.trim();
}

function agregarCelda(fila, valor) {
  const celda = document.createElement('td');
  celda.textContent = valor;
  fila.append(celda);
  return celda;
}

async function solicitar(url, opciones = {}) {
  const respuesta = await fetch(url, opciones);
  const datos = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'La solicitud no pudo completarse.');
  }
  return datos;
}

async function cargarProductos() {
  try {
    const productos = await solicitar('/api/productos');
    tablaGestion.replaceChildren();

    for (const producto of productos) {
      const fila = document.createElement('tr');
      agregarCelda(fila, producto.nombre);
      agregarCelda(fila, producto.categoria);
      agregarCelda(fila, `₡${Number(producto.precio).toLocaleString('es-CR')}`);
      agregarCelda(fila, producto.stock);

      const celdaAcciones = document.createElement('td');
      const acciones = document.createElement('div');
      acciones.className = 'acciones-tabla';

      const botonEditar = document.createElement('button');
      botonEditar.className = 'boton boton-secundario';
      botonEditar.type = 'button';
      botonEditar.dataset.accion = 'editar';
      botonEditar.dataset.id = producto.id;
      botonEditar.textContent = 'Editar';

      const botonEliminar = document.createElement('button');
      botonEliminar.className = 'boton boton-peligro';
      botonEliminar.type = 'button';
      botonEliminar.dataset.accion = 'eliminar';
      botonEliminar.dataset.id = producto.id;
      botonEliminar.textContent = 'Eliminar';

      acciones.append(botonEditar, botonEliminar);
      celdaAcciones.append(acciones);
      fila.append(celdaAcciones);
      tablaGestion.append(fila);
    }
  } catch (error) {
    mostrarEstado(error.message || 'No fue posible cargar los productos.', 'error');
  }
}

function reiniciarFormulario() {
  formularioProducto.reset();
  idEnEdicion = null;
  botonGuardar.textContent = 'Registrar producto';
  botonCancelar.classList.add('oculto');
  document.querySelector('#titulo-formulario').textContent = 'Registrar producto';
}

formularioProducto.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const datos = new FormData(formularioProducto);
  const producto = {
    nombre: datos.get('nombre').trim(),
    categoria: datos.get('categoria').trim(),
    precio: Number(datos.get('precio')),
    stock: Number(datos.get('stock'))
  };
  const editando = idEnEdicion !== null;
  const url = editando ? `/api/productos/${idEnEdicion}` : '/api/productos';

  try {
    const respuesta = await solicitar(url, {
      method: editando ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    mostrarEstado(respuesta.mensaje, 'exito');
    reiniciarFormulario();
    await cargarProductos();
  } catch (error) {
    mostrarEstado(error.message || 'No fue posible guardar el producto.', 'error');
  }
});

tablaGestion.addEventListener('click', async (evento) => {
  const boton = evento.target.closest('button[data-accion]');
  if (!boton) return;

  const id = boton.dataset.id;
  if (boton.dataset.accion === 'editar') {
    try {
      const producto = await solicitar(`/api/productos/${id}`);
      formularioProducto.elements.nombre.value = producto.nombre;
      formularioProducto.elements.categoria.value = producto.categoria;
      formularioProducto.elements.precio.value = producto.precio;
      formularioProducto.elements.stock.value = producto.stock;
      idEnEdicion = producto.id;
      botonGuardar.textContent = 'Guardar cambios';
      botonCancelar.classList.remove('oculto');
      document.querySelector('#titulo-formulario').textContent = 'Editar producto';
      mostrarEstado(`Editando: ${producto.nombre}`);
      formularioProducto.elements.nombre.focus();
    } catch (error) {
      mostrarEstado(error.message || 'No fue posible consultar el producto.', 'error');
    }
    return;
  }

  if (boton.dataset.accion === 'eliminar') {
    const fila = boton.closest('tr');
    const nombre = fila.cells[0].textContent;
    if (!window.confirm(`¿Confirma que desea eliminar "${nombre}"?`)) return;

    try {
      const respuesta = await solicitar(`/api/productos/${id}`, { method: 'DELETE' });
      mostrarEstado(respuesta.mensaje, 'exito');
      if (String(idEnEdicion) === id) reiniciarFormulario();
      await cargarProductos();
    } catch (error) {
      mostrarEstado(error.message || 'No fue posible eliminar el producto.', 'error');
    }
  }
});

botonCancelar.addEventListener('click', () => {
  reiniciarFormulario();
  mostrarEstado('Edición cancelada.');
});

document.querySelector('#actualizar-gestion').addEventListener('click', cargarProductos);
cargarProductos();