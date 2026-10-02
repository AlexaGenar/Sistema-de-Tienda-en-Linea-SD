# Sistema-de-Tienda-en-Linea-SD

Proyecto grupal de Sistemas Distribuidos: aplicación web de tienda en línea con REST, RPC y Servicios Web.

## Descripción

Sistema web para administrar productos y realizar operaciones relacionadas con una tienda en línea. El proyecto integra un servicio REST para la gestión de productos, persistencia mediante un archivo de texto JSON y un Servicio Web utilizando GraphQL para consultar información externa de países. El proyecto también integra RPC mediante JSON-RPC 2.0 con Ethereum, utilizado para estimar la comisión de red dentro del proceso de compra.

## Responsabilidades

- Aarón: servicio REST y gestión de productos.
- Sofía: selección de productos, proceso de compra e integración de RPC con Ethereum para estimar la comisión de red.
- Génesis: dashboard, navegación e integración del Servicio Web con GraphQL.
- Los tres: integración, pruebas, documentación y exposición.

## Tecnologías

Node.js, Express, HTML, CSS, JavaScript, `fetch()`, REST, JSON-RPC 2.0, Ethereum, GraphQL y archivos planos `.txt`.

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
│       ├── compra.js
│       ├── gestionar-productos.js
│       ├── inicio.js
│       └── productos.js
│
├── rest/
│   ├── data/
│   │   └── productos.txt
│   ├── routes/
│   │   └── productosRoutes.js
│   └── services/
│       └── productosService.js
│
├── rpc/
│   ├── routes/
│   │   └── rpcRoutes.js
│   └── services/
│       └── rpcService.js
│
├── web-services/
│   ├── routes/
│   │   └── graphqlRoutes.js
│   └── services/
│       └── graphqlService.js
│
├── .gitignore
├── app.js
├── Integrantes.txt
├── package.json
├── package-lock.json
└── README.md
```

## Interfaces

- `/`: **Inicio / Dashboard**, presenta el sistema y permite navegar a las demás interfaces.
- `/productos`: **Consulta de información**, muestra el catálogo de productos mediante solicitudes REST.
- `/gestionar-productos`: **Registro / Gestión de información**, permite registrar, consultar, modificar y eliminar productos.
- `/operaciones`: **Operaciones especiales**, permite seleccionar productos, visualizar el total de la compra, seleccionar Ethereum como método de pago, obtener una estimación de la comisión de red mediante RPC y consultar información de países mediante el Servicio Web con GraphQL.

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

## RPC - Ethereum

Para la funcionalidad RPC se utiliza JSON-RPC 2.0 con Ethereum. Esta integración forma parte del proceso de compra y permite obtener una estimación de la comisión de red cuando el usuario selecciona Ethereum como método de pago.

La comunicación se realiza desde el backend mediante solicitudes POST a un nodo público de Ethereum.

Se utilizan los siguientes métodos RPC:

- `eth_gasPrice`: consulta el precio del gas de la red.
- `eth_estimateGas`: estima las unidades de gas necesarias para realizar la operación.

Con los valores obtenidos se calcula la comisión estimada:

```text
Comisión en Wei = precio del gas × gas estimado
```

Posteriormente, el resultado se convierte de Wei a ETH para mostrarlo en la interfaz.

La funcionalidad se encuentra disponible mediante:

```text
/rpc/ethereum/comision
```

Cuando el usuario selecciona Ethereum como método de pago en la interfaz de Operaciones especiales, el frontend consulta esta ruta y muestra la comisión estimada obtenida.

La aplicación no realiza una transacción real con Ethereum. Los datos de la operación se utilizan únicamente para estimar el gas necesario y calcular una comisión aproximada de red.

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
- Conexión a Internet para realizar las consultas de Ethereum y del Servicio Web.

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
- Interfaz 4: Operaciones especiales.
- Servicio REST de productos con persistencia en `rest/data/productos.txt`.
- Integración del Servicio Web con GraphQL.
- Consulta de información de países desde la Interfaz 4.
- Selección de productos y cálculo del total de compra.
- Integración de RPC con Ethereum.
- Estimación de la comisión de red mediante `eth_gasPrice` y `eth_estimateGas`.
- Integración de RPC dentro de la Interfaz 4.


