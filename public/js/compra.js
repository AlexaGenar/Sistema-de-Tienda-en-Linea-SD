const contenedorProductos = document.querySelector('#productos-compra');
const totalCompra = document.querySelector('#total-compra');
const metodosPago = document.querySelectorAll('input[name="metodo-pago"]');
const informacionEthereum = document.querySelector('#informacion-ethereum');
const comisionEthereum = document.querySelector('#comision-ethereum');

function calcularTotal() {
  const seleccionados = contenedorProductos.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  let total = 0;

  for (const checkbox of seleccionados) {
    total += Number(checkbox.value);
  }

  totalCompra.textContent =
    `₡${total.toLocaleString('es-CR')}`;
}

async function cargarProductos() {

  const respuesta = await fetch('/api/productos');

  const productos = await respuesta.json();

  contenedorProductos.replaceChildren();

  for (const producto of productos) {

    const opcion = document.createElement('label');

    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.value = producto.precio;

    checkbox.addEventListener('change', calcularTotal);

    opcion.append(
      checkbox,
      ` ${producto.nombre} - ₡${Number(producto.precio).toLocaleString('es-CR')}`
    );

    contenedorProductos.append(opcion);
  }
}

async function cargarComisionEthereum() {

  comisionEthereum.textContent = 'Calculando...';

  try {

    const respuesta = await fetch('/rpc/ethereum/comision');

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error('No fue posible calcular la comisión.');
    }

    comisionEthereum.textContent =
      `${datos.comisionEth.toFixed(9)} ETH`;

  } catch (error) {

    console.error(error);

    comisionEthereum.textContent =
      'No disponible';

  }
}

cargarProductos();

for (const metodo of metodosPago) {
  metodo.addEventListener('change', () => {
    if (metodo.value === 'ethereum' && metodo.checked) {
      informacionEthereum.hidden = false;
      cargarComisionEthereum();
    }

    if (metodo.value === 'normal' && metodo.checked) {
      informacionEthereum.hidden = true;
    }
  });
}