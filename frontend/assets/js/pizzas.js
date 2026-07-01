protectAdmin();

let pizzas = [];

const API_URL = "http://localhost:3000/api/pizzas";

/* IMAGENES AUTOMATICAS POR NOMBRE */
function getImage(nombre) {
    return `https://source.unsplash.com/400x300/?pizza,${encodeURIComponent(nombre)}`;
}

/* CARGAR PIZZAS */
async function cargarPizzas() {

    try {

        const response = await fetch(API_URL);

        pizzas = await response.json();

        render();

    } catch (error) {

        console.error("Error al cargar pizzas:", error);

    }

}

/* AGREGAR PIZZA */
async function agregarPizza() {

    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;

    if (!nombre || !precio) {
        alert("Completa los campos");
        return;
    }

    const nuevaPizza = {

        nombre,
        descripcion: "",
        precio,
        imagen: getImage(nombre)

    };

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(nuevaPizza)

        });

        if (!response.ok) {
            throw new Error("No se pudo guardar la pizza");
        }

        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";

        cargarPizzas();

    } catch (error) {

        console.error(error);

        alert("Error al guardar la pizza");

    }

}

/* RENDER */
function render() {

    const grid = document.getElementById("gridPizzas");

    grid.innerHTML = "";

    pizzas.forEach((p) => {

        const div = document.createElement("div");

        div.className = "card pizza";

        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            <button onclick="eliminar(${p.id})">Eliminar</button>
        `;

        grid.appendChild(div);

    });

}

/* ELIMINAR */
async function eliminar(id) {

    if (!confirm("¿Eliminar esta pizza?")) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        if (!response.ok) {
            throw new Error("No se pudo eliminar");
        }

        cargarPizzas();

    } catch (error) {

        console.error(error);

        alert("Error al eliminar la pizza");

    }

}

/* INIT */
cargarPizzas();