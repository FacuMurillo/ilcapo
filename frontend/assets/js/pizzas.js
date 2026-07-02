
let pizzas = [];

const grid = document.getElementById("gridPizzas");

// ===============================
// CARGAR PIZZAS DESDE BACKEND
// ===============================
async function cargarPizzas() {
    try {
        const res = await fetch("http://localhost:3000/api/pizzas");
        pizzas = await res.json();
        renderPizzas();
    } catch (error) {
        console.error("Error cargando pizzas:", error);
    }
}

// ===============================
// RENDER
// ===============================
function renderPizzas() {
    grid.innerHTML = "";

    pizzas.forEach(p => {
        grid.innerHTML += `
        <div class="pizza-card">

            <img src="${p.imagen || '../assets/img/default.jpg'}">

            <div class="pizza-info">

                <h3>${p.nombre}</h3>

                <p>$${p.precio}</p>

                <button onclick="eliminarPizza(${p.id})">
                    Eliminar
                </button>

            </div>

        </div>
        `;
    });
}

// ===============================
// AGREGAR PIZZA (POST API)
// ===============================
async function agregarPizza() {

    const nueva = {
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        descripcion: "",
        imagen: "../assets/img/pizzas/default.jpg"
    };

    try {
        await fetch("http://localhost:3000/api/pizzas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nueva)
        });

        cargarPizzas(); // recargar desde DB

    } catch (error) {
        console.error("Error agregando pizza:", error);
    }
}

// ===============================
// ELIMINAR PIZZA (DELETE API)
// ===============================
async function eliminarPizza(id) {

    try {
        await fetch(`http://localhost:3000/api/pizzas/${id}`, {
            method: "DELETE"
        });

        cargarPizzas(); // recargar desde DB

    } catch (error) {
        console.error("Error eliminando pizza:", error);
    }
}

// ===============================
// INICIO
// ===============================
cargarPizzas();