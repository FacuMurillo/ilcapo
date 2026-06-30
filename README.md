# ilCapo ERP

## Descripción

**ilCapo ERP** es un sistema web de gestión para una pizzería desarrollado como proyecto académico. Su objetivo es centralizar la administración del negocio mediante un panel para administradores y una interfaz para clientes, simulando el funcionamiento de un sistema de gestión comercial.

El proyecto fue desarrollado utilizando **HTML, CSS y JavaScript**, almacenando la información mediante **LocalStorage**, sin necesidad de una base de datos o servidor.

---

## Objetivos del proyecto

* Gestionar el stock de ingredientes de la pizzería.
* Administrar el catálogo de pizzas.
* Simular el proceso de compra de un cliente.
* Registrar pedidos realizados.
* Administrar proveedores y reposición de stock.
* Obtener información y reportes del negocio.
* Implementar control de acceso mediante roles.

---

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript (ES6)
* LocalStorage

---

## Roles del sistema

### Administrador

El administrador tiene acceso al panel de gestión donde puede:

* Visualizar un dashboard con información general.
* Gestionar el catálogo de pizzas.
* Controlar el stock de ingredientes.
* Consultar los pedidos realizados.
* Gestionar proveedores y realizar pedidos de reposición.
* Visualizar los clientes registrados.
* Consultar reportes del negocio.

### Cliente

El cliente puede:

* Iniciar sesión.
* Visualizar el catálogo de pizzas.
* Agregar productos al carrito.
* Confirmar pedidos.
* Consultar el historial de pedidos realizados.

---

## Módulos del sistema

### Dashboard

Muestra un resumen del estado del negocio mediante indicadores como:

* Total de pedidos.
* Clientes activos.
* Ventas estimadas.
* Cantidad de pizzas vendidas.
* Últimos pedidos registrados.

---

### Gestión de Pizzas

Permite:

* Agregar nuevas pizzas.
* Visualizar el catálogo.
* Eliminar pizzas.
* Gestionar el stock disponible de cada pizza.

Cada pizza representa un producto final elaborado a partir del consumo de ingredientes.

---

### Gestión de Ingredientes

Controla el inventario de:

* Prepizzas
* Salsa
* Mozzarella
* Jamón
* Salame
* Ternera
* Roquefort
* Anchoas
* Calabresa

El administrador puede reponer stock cuando sea necesario.

---

### Pedidos

Registra todas las compras realizadas por los clientes, indicando:

* Cliente
* Fecha
* Productos solicitados

---

### Proveedores

Permite administrar los proveedores encargados de abastecer los ingredientes del negocio.

Desde este módulo es posible simular pedidos de reposición para actualizar el stock.

---

### Clientes

Visualiza los clientes registrados junto con información como:

* Cantidad de pedidos realizados.
* Fecha del último pedido.

---

### Reportes

Permite consultar información del negocio mediante distintos períodos:

* Diario
* Semanal
* Mensual

Los reportes muestran indicadores generales para facilitar el análisis del funcionamiento del sistema.

---

## Lógica de negocio

Cada pizza consume ingredientes específicos del inventario.

Por ejemplo:

* Pizza Muzzarella:

  * 1 Prepizza
  * Salsa
  * Mozzarella

* Pizza Especial:

  * 1 Prepizza
  * Salsa
  * Mozzarella
  * Jamón

* Pizza Calabresa:

  * 1 Prepizza
  * Salsa
  * Mozzarella
  * Calabresa

Cuando un cliente confirma un pedido:

1. Se registra el pedido.
2. Se descuentan los ingredientes correspondientes del stock.
3. Se actualiza la información del dashboard.
4. El administrador puede visualizar el pedido.
5. Si un pedido es cancelado o devuelto, el stock puede ser repuesto.

---

## Estructura del proyecto

```text
frontend/
│
├── index.html
│
├── admin/
│   ├── dashboard.html
│   ├── pizzas.html
│   ├── ingredientes.html
│   ├── pedidos.html
│   ├── proveedores.html
│   ├── clientes.html
│   └── reportes.html
│
├── cliente/
│   ├── home.html
│   └── pedidos.html
│
└── assets/
    ├── css/
    │   └── dashboard.css
    │
    └── js/
        ├── main.js
        ├── dashboard.js
        ├── pizzas.js
        ├── ingredientes.js
        ├── pedidos.js
        ├── proveedores.js
        ├── clientes.js
        └── reportes.js
```

---

## Usuarios de prueba

### Administrador

* Usuario: **admin**
* Contraseña: **1234**

### Cliente

* Usuario: **cliente**
* Contraseña: **1234**

---

## Mejoras futuras

* Base de datos con MySQL o PostgreSQL.
* Backend con Node.js y Express.
* Autenticación mediante JWT.
* Encriptación de contraseñas con bcrypt.
* Gestión de múltiples sucursales.
* Panel de estadísticas con gráficos dinámicos.
* Gestión de empleados y repartidores.
* Integración con medios de pago.

---

## Autor

**Facundo Murillo**

Proyecto desarrollado para la materia **Metodología de Sistemas**, con el objetivo de aplicar conceptos de análisis, diseño y desarrollo de un sistema de gestión para una pizzería.
