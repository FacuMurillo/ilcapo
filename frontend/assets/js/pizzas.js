let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];

const grid = document.getElementById("gridPizzas");

function renderPizzas(){

grid.innerHTML = "";

pizzas.forEach(p => {

grid.innerHTML += `
<div class="pizza-card">

<img src="${p.imagen || '../assets/img/default.jpg'}">

<div class="pizza-info">

<h3>${p.nombre}</h3>

<p>$${p.precio}</p>

<button onclick="eliminarPizza(${p.id})">Eliminar</button>

</div>

</div>
`;

});

}

function agregarPizza(){

let nueva = {

id: Date.now(),

nombre: document.getElementById("nombre").value,

precio: Number(document.getElementById("precio").value),

stock: 10,

imagen: "../assets/img/pizzas/default.jpg"

};

pizzas.push(nueva);

localStorage.setItem("pizzas", JSON.stringify(pizzas));

renderPizzas();

}

function eliminarPizza(id){

pizzas = pizzas.filter(p => p.id !== id);

localStorage.setItem("pizzas", JSON.stringify(pizzas));

renderPizzas();

}

renderPizzas();