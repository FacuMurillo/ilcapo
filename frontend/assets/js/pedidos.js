
let carrito = [];

let pizzas = [];
let pedidos = [];

// =========================
// CARGAR PIZZAS DESDE API
// =========================
async function cargarPizzas() {
    const res = await fetch("http://localhost:3000/api/pizzas");
    pizzas = await res.json();
    renderPizzas();
}

// =========================
// RENDER PIZZAS
// =========================
const contenedor = document.getElementById("pizzasContainer");

function renderPizzas() {
    contenedor.innerHTML = "";

    pizzas.forEach(p => {
        contenedor.innerHTML += `
        <div class="pizza-card">

            <img src="${p.imagen}" alt="${p.nombre}">

            <div class="pizza-info">

                <h3>${p.nombre}</h3>

                <p>$${p.precio}</p>

                <button onclick="addPizza(${p.id})">
                    Agregar
                </button>

            </div>

        </div>
        `;
    });
}

// =========================
// AGREGAR AL CARRITO
// =========================
function addPizza(id) {

    let pizza = pizzas.find(p => p.id === id);

    if (!pizza) return;

    let item = carrito.find(i => i.id === id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({
            id: pizza.id,
            nombre: pizza.nombre,
            precio: pizza.precio,
            cantidad: 1
        });
    }

    renderCarrito();
}

// =========================
// RENDER CARRITO
// =========================
function renderCarrito() {

    let ul = document.getElementById("carrito");

    ul.innerHTML = "";

    if (carrito.length === 0) {
        ul.innerHTML = "<li>Carrito vacío</li>";
        return;
    }

    carrito.forEach(i => {
        ul.innerHTML += `
        <li>
            ${i.nombre} x${i.cantidad} - $${i.precio * i.cantidad}
        </li>
        `;
    });
}

// =========================
// CONFIRMAR PEDIDO (API REAL)
// =========================
async function confirmar() {

    if (carrito.length === 0) {
        alert("Carrito vacío");
        return;
    }

    let session = JSON.parse(localStorage.getItem("user"));

    if (!session) return;

    let nuevoPedido = {
        cliente: session.user,
        fecha: new Date().toLocaleString(),
        estado: "Pendiente",
        items: carrito,
        total: carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
    };

    try {
        await fetch("http://localhost:3000/api/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPedido)
        });

        carrito = [];
        renderCarrito();

        alert("Pedido creado ✔");

    } catch (error) {
        console.error("Error creando pedido:", error);
    }
}

// =========================
// INICIO
// =========================
cargarPizzas();
renderCarrito();