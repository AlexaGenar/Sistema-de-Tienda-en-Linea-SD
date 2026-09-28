const express = require('express');
const path = require('path');
const productosRoutes = require('./routes/productosRoutes');

const app = express();
const puerto = 3000;
const carpetaVistas = path.join(__dirname, 'views');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/productos', productosRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(carpetaVistas, 'index.html'));
});

app.get('/productos', (req, res) => {
  res.sendFile(path.join(carpetaVistas, 'productos.html'));
});

app.get('/gestionar-productos', (req, res) => {
  res.sendFile(path.join(carpetaVistas, 'gestionar-productos.html'));
});

app.get('/compra', (req, res) => {
  res.sendFile(path.join(carpetaVistas, 'compra.html'));
});

app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ mensaje: 'El cuerpo de la solicitud debe ser JSON válido.' });
  }

  console.error(error);
  return res.status(500).json({ mensaje: 'Ocurrió un error interno al procesar la solicitud.' });
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});