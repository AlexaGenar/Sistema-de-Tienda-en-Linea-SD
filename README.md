# Sistema-de-Tienda-en-Linea-SD
Proyecto grupal de Sistemas Distribuidos: aplicación web de tienda en línea con REST, RPC y Servicios Web.

## Descripción

Sistema web para administrar productos y compras. Esta entrega implementa la estructura compartida y el servicio REST para gestionar productos, con persistencia en un archivo de texto JSON.

## Responsabilidades

- Aarón: servicio REST y gestión de productos.
- Sofía: selección de productos, compra y cálculo del total mediante RPC (pendiente).
- Génesis: dashboard, navegación e integración del Servicio Web con GraphQL (pendiente).
- Los tres: integración, pruebas, documentación y exposición.

## Tecnologías

Node.js, Express, HTML, CSS, JavaScript, `fetch()` y archivos planos `.txt`. Axios figura como dependencia disponible para el proyecto, pero las páginas de esta entrega se comunican con Express usando `fetch()`.

## Estructura

```text
app.js
package.json
data/productos.txt
routes/productosRoutes.js
services/productosService.js
views/index.html
views/productos.html
views/gestionar-productos.html
views/compra.html
public/css/estilos.css
public/js/inicio.js
public/js/productos.js
public/js/gestionar-productos.js
```

## Interfaces

- `/`: dashboard con navegación y cantidad de productos consultada desde REST. Incluye un espacio reservado para GraphQL.
- `/productos`: catálogo consultado mediante REST.
- `/gestionar-productos`: formulario y tabla para registrar, editar y eliminar productos.
- `/compra`: espacio reservado para la selección de productos y el cálculo mediante RPC de Sofía.

## Endpoints REST

Base: `/api/productos`.

| Método | Ruta | Descripción | Respuesta esperada |
| --- | --- | --- | --- |
| GET | `/api/productos` | Consultar todos los productos | 200 |
| GET | `/api/productos/:id` | Consultar un producto por ID | 200, 404 |
| POST | `/api/productos` | Registrar un producto | 201, 400 |
| PUT | `/api/productos/:id` | Reemplazar completamente un producto | 200, 400, 404 |
| DELETE | `/api/productos/:id` | Eliminar un producto | 200, 404 |

Todos los errores se devuelven como JSON; los errores internos usan el estado 500. Los productos requieren `nombre`, `categoria`, `precio` y `stock`; el identificador se genera automáticamente.

## Ejecución

Requisitos: Node.js con soporte para `node --watch`.

```sh
npm install
npm start
```

La aplicación estará disponible en <http://localhost:3000>. Para desarrollo, ejecutar `npm run dev`.

## Estado actual

Completado en esta entrega: estructura compartida, cuatro interfaces base y REST de productos con persistencia en `data/productos.txt`.

Pendiente: RPC de compra de Sofía y Servicio Web GraphQL de Génesis. No están implementados en esta entrega.
