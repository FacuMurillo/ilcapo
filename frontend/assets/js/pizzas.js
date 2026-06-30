protectAdmin();

let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];

/* IMAGENES AUTOMATICAS POR NOMBRE */
function getImage(nombre){
return `https://source.unsplash.com/400x300/?pizza,${nombre}`;
}

/* AGREGAR PIZZA */
function agregarPizza(){

let nombre = document.getElementById("nombre").value;
let precio = document.getElementById("precio").value;

if(!nombre || !precio){
alert("Completa los campos");
return;
}

let nueva = {
nombre,
precio,
img: getImage(nombre)
};

pizzas.push(nueva);

localStorage.setItem("pizzas", JSON.stringify(pizzas));

render();
}

/* RENDER */
function render(){

let grid = document.getElementById("gridPizzas");
grid.innerHTML = "";

pizzas.forEach((p, index) => {

let div = document.createElement("div");
div.className = "card pizza";

div.innerHTML = `
<img src="${p.img}" />
<h3>${p.nombre}</h3>
<p>$${p.precio}</p>
<button onclick="eliminar(${index})">Eliminar</button>
`;

grid.appendChild(div);

});

}

/* ELIMINAR */
function eliminar(i){
pizzas.splice(i,1);
localStorage.setItem("pizzas", JSON.stringify(pizzas));
render();
}

/* INIT */
render();