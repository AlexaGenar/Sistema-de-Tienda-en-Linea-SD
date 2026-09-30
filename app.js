const express = require('express');
const path = require('path');

const productosRoutes = require('./rest/routes/productosRoutes');
const rpcRoutes = require('./rest/routes/rpcRoutes');
const graphqlRoutes = require('./web-services/routes/graphqlRoutes');

const app = express();
const puerto = 3000;


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/productos', productosRoutes);
app.use('/', rpcRoutes);

// Rutas relacionadas con GraphQL
app.use('/api', graphqlRoutes);


// Página principal
app.get('/', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      'frontend',
      'interfaz1',
      'index.html'
    )
  );
});

app.get('/productos', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      'frontend',
      'interfaz2',
      'index.html'
    )
  );
});

app.get('/gestionar-productos', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      'frontend',
      'interfaz3',
      'index.html'
    )
  );
});

// Servir la interfaz
app.use(
  express.static(
    path.join(
      __dirname,
      'frontend',
      'interfaz1'
    )
  )
);

app.get('/operaciones', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      'frontend',
      'interfaz4',
      'index.html'
    )
  );
});


app.use((error, req, res, next) => {

  if (error.type === 'entity.parse.failed') {

    return res.status(400).json({
      mensaje:
        'El cuerpo de la solicitud debe ser JSON válido.'
    });

  }

  console.error(error);

  return res.status(500).json({
    mensaje:
      'Ocurrió un error interno al procesar la solicitud.'
  });

});


app.listen(puerto, () => {

  console.log(
    `Servidor escuchando en http://localhost:${puerto}`
  );

});