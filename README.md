# Sistema-de-Tienda-en-Linea-SD

Proyecto grupal de Sistemas Distribuidos: aplicación web de tienda en línea con REST, RPC y Servicios Web.

## Descripción

Sistema web para administrar productos y realizar operaciones relacionadas con una tienda en línea. El proyecto integra un servicio REST para la gestión de productos, persistencia mediante un archivo de texto JSON y un Servicio Web utilizando GraphQL para consultar información externa de países.

## Responsabilidades

- Aarón: servicio REST y gestión de productos.
- Sofía: selección de productos, compra y cálculo del total mediante RPC (pendiente).
- Génesis: dashboard, navegación e integración del Servicio Web con GraphQL.
- Los tres: integración, pruebas, documentación y exposición.

## Tecnologías

Node.js, Express, HTML, CSS, JavaScript, `fetch()`, GraphQL y archivos planos `.txt`.

## Estructura

```text
Sistema-de-Tienda-en-Linea-SD/
│
├── frontend/
│   ├── interfaz1/
│   │   └── index.html
│   ├── interfaz2/
│   │   └── index.html
│   ├── interfaz3/
│   │   └── index.html
│   └── interfaz4/
│       └── index.html
│
├── public/
│   ├── css/
│   │   └── estilos.css
│   └── js/
│       ├── inicio.js
│       ├── productos.js
│       └── gestionar-productos.js
│
├── rest/
│   ├── data/
│   │   └── productos.txt
│   ├── routes/
│   │   └── productosRoutes.js
│   └── services/
│       └── productosService.js
│
├── web-services/
│   ├── routes/
│   │   └── graphqlRoutes.js
│   └── services/
│       └── graphqlService.js
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Interfaces

- `/`: **Inicio / Dashboard**, presenta el sistema y permite navegar a las demás interfaces.
- `/productos`: **Consulta de información**, muestra el catálogo de productos mediante solicitudes REST.
- `/gestionar-productos`: **Registro / Gestión de información**, permite registrar, consultar, modificar y eliminar productos.
- `/operaciones`: **Operaciones especiales / Reportes**, integra las operaciones de compra y la consulta de información de países mediante el Servicio Web con GraphQL.

## Endpoints REST

Base: `/api/productos`.

| **Método** | **Ruta** | **Descripción** | **Respuesta esperada** |
| ---------- | -------- | --------------- | ---------------------- |
| GET | `/api/productos` | Consultar todos los productos | 200 |
| GET | `/api/productos/:id` | Consultar un producto por ID | 200, 404 |
| POST | `/api/productos` | Registrar un producto | 201, 400 |
| PUT | `/api/productos/:id` | Reemplazar completamente un producto | 200, 400, 404 |
| DELETE | `/api/productos/:id` | Eliminar un producto | 200, 404 |

Todos los errores se devuelven como JSON; los errores internos usan el estado 500. Los productos requieren `nombre`, `categoria`, `precio` y `stock`; el identificador se genera automáticamente.

## Servicio Web - GraphQL

El proyecto integra un Servicio Web utilizando GraphQL, basado en el código trabajado durante la Semana 4.

Se utiliza Countries API para obtener información de países. La aplicación realiza una consulta GraphQL solicitando los siguientes datos:

- Código del país.
- Nombre.
- Emoji.
- Capital.
- Moneda.

El servicio se encuentra organizado en:

```text
web-services/
├── routes/
│   └── graphqlRoutes.js
└── services/
    └── graphqlService.js
```

La aplicación expone la información obtenida mediante:

```text
GET /api/paises
```

Esta información se utiliza en la Interfaz 4 para consultar datos relacionados con el país indicado para una compra internacional.

## Ejecución

Requisitos:

- Node.js
- npm
- Conexión a Internet para realizar la consulta al Servicio Web.

Instalar las dependencias:

```text
npm install
```

Iniciar la aplicación:

```text
npm start
```

También puede ejecutarse mediante:

```text
node app.js
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

Para desarrollo:

```text
npm run dev
```

## Estado actual

Completado:

- Estructura compartida del proyecto.
- Interfaz 1: Inicio / Dashboard.
- Interfaz 2: Consulta de información.
- Interfaz 3: Registro / Gestión de información.
- Servicio REST de productos con persistencia en `rest/data/productos.txt`.
- Integración del Servicio Web con GraphQL.
- Consulta de información de países desde la Interfaz 4.

Pendiente:

- Integración del RPC de compra y cálculo del total correspondiente a Sofía.
- Integración final de las funcionalidades de compra dentro de la Interfaz 4.

Completado en esta entrega: estructura compartida, cuatro interfaces base y REST de productos con persistencia en `data/productos.txt`.

