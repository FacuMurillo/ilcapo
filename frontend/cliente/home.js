protectClient();

/*==============================
      ESTADO
==============================*/

let pizzas = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/*==============================
      ELEMENTOS
==============================*/

const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscar");
const contador = document.getElementById("contadorCarrito");

/*==============================
      CARGAR PIZZAS DESDE API
==============================*/

async function cargarPizzas() {
    try {
        const res = await fetch("http://localhost:3000/api/pizzas");
        pizzas = await res.json();
        renderPizzas(pizzas);
    } catch (error) {
        console.error("Error cargando pizzas:", error);
    }
}

/*==============================
      RENDER PIZZAS
==============================*/

function renderPizzas(lista) {

    catalogo.innerHTML = "";

    lista.forEach(pizza => {

        catalogo.innerHTML += `
        <div class="pizza-card">

            <div class="pizza-img">
                <img src="${pizza.imagen}" alt="${pizza.nombre}">
            </div>

            <div class="pizza-info">

                <h3>${pizza.nombre}</h3>

                <p>${pizza.descripcion || ""}</p>

                <div class="precio">
                    $${pizza.precio}
                </div>

                <button class="agregar" onclick="agregarCarrito(${pizza.id})">
                    Agregar al carrito
                </button>

            </div>

        </div>
        `;
    });
}

/*==============================
      BUSCADOR
==============================*/

buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLowerCase();

    const filtradas = pizzas.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    renderPizzas(filtradas);
});

/*==============================
      INICIO
==============================*/

cargarPizzas();
actualizarContador();

/*==============================
      CARRITO
==============================*/

function agregarCarrito(id) {

    let pizza = pizzas.find(p => p.id === id);

    let item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({
            id: pizza.id,
            nombre: pizza.nombre,
            precio: pizza.precio,
            imagen: pizza.imagen,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarContador();
    mostrarToast("Agregado al carrito");
}

/*==============================
      GUARDAR CARRITO
==============================*/

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/*==============================
      CONTADOR
==============================*/

function actualizarContador() {
    let total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contador.innerText = total;
}

/*==============================
      RENDER CARRITO
==============================*/

const carritoPanel = document.getElementById("carrito");
const fondo = document.getElementById("fondoOscuro");
const itemsCarrito = document.getElementById("itemsCarrito");
const totalCarrito = document.getElementById("totalCarrito");

document.getElementById("abrirCarrito").onclick = () => {
    carritoPanel.classList.add("active");
    fondo.classList.add("active");
    renderCarrito();
};

document.getElementById("cerrarCarrito").onclick = () => {
    carritoPanel.classList.remove("active");
    fondo.classList.remove("active");
};

fondo.onclick = () => {
    carritoPanel.classList.remove("active");
    fondo.classList.remove("active");
};

function renderCarrito() {

    itemsCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(item => {

        total += item.precio * item.cantidad;

        itemsCarrito.innerHTML += `
        <div class="item-carrito">

            <img src="${item.imagen}">

            <div class="item-info">

                <h4>${item.nombre}</h4>

                <span>$${item.precio}</span>

                <div class="item-cantidad">

                    <button onclick="restar(${item.id})">-</button>

                    <span>${item.cantidad}</span>

                    <button onclick="sumar(${item.id})">+</button>

                </div>

            </div>

        </div>
        `;
    });

    totalCarrito.innerText = "$" + total;
}

/*==============================
      SUMAR / RESTAR
==============================*/

function sumar(id) {

    let item = carrito.find(p => p.id === id);
    item.cantidad++;

    guardarCarrito();
    renderCarrito();
    actualizarContador();
}

function restar(id) {

    let item = carrito.find(p => p.id === id);
    item.cantidad--;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    renderCarrito();
    actualizarContador();
}

/*==============================
      TOAST
==============================*/

function mostrarToast(msg) {

    let toast = document.getElementById("toast");

    toast.innerText = msg;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/*==============================
      FINALIZAR PEDIDO (API)
==============================*/

document.getElementById("finalizarCompra").onclick = async () => {

    if (carrito.length === 0) {
        mostrarToast("El carrito está vacío");
        return;
    }

    let nuevoPedido = {
        cliente: localStorage.getItem("user") || "cliente",
        fecha: new Date().toLocaleString(),
        estado: "Pendiente",
        items: carrito,
        total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
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
        localStorage.removeItem("carrito");

        actualizarContador();
        renderCarrito();

        mostrarToast("Pedido realizado con éxito 🎉");

        carritoPanel.classList.remove("active");
        fondo.classList.remove("active");

    } catch (error) {
        console.error("Error al crear pedido:", error);
    }
};