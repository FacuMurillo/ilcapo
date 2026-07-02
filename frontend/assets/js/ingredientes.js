
let stock = [];

const contenedores = {
    mozzarella: "mozz",
    salsa: "salsa",
    prepizza: "prepizza",
    jamon: "jamon",
    anchoas: "anchoas",
    ternera: "ternera",
    calabresa: "calabresa",
    roquefort: "roquefort"
};

// ===============================
// CARGAR DESDE BACKEND
// ===============================
async function cargarStock() {
    try {
        const res = await fetch("http://localhost:3000/api/ingredientes");
        stock = await res.json();
        render();
    } catch (error) {
        console.error("Error cargando stock:", error);
    }
}

// ===============================
// RENDER
// ===============================
function render() {

    stock.forEach(i => {

        const id = contenedores[i.nombre.toLowerCase()];

        if (!id) return;

        document.getElementById(id).innerText = i.stock + " unidades";

        color(id + "Card", i.stock);
    });
}

// ===============================
// COLOR SEGÚN STOCK
// ===============================
function color(id, value) {

    let el = document.getElementById(id);

    if (!el) return;

    if (value <= 2) {
        el.style.background = "#fecaca";
    } else if (value <= 5) {
        el.style.background = "#fef9c3";
    } else {
        el.style.background = "#dcfce7";
    }
}

// ===============================
// REABASTECER (UPDATE BACKEND)
// ===============================
async function reponerStock() {

    const ing = document.getElementById("ingrediente").value;
    const cant = Number(document.getElementById("cantidad").value);

    if (!cant || cant <= 0) {
        alert("Ingresá una cantidad válida");
        return;
    }

    try {
        await fetch("http://localhost:3000/api/ingredientes/reponer", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: ing,
                cantidad: cant
            })
        });

        cargarStock();

        alert("Stock actualizado ✔");

        document.getElementById("cantidad").value = "";

    } catch (error) {
        console.error("Error actualizando stock:", error);
    }
}

// ===============================
// INICIO
// ===============================
cargarStock();