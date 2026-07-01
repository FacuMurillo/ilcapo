let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];

/* =========================
   FALLBACK PIZZAS (PRO)
========================= */
if(pizzas.length === 0){
pizzas = [
{
id:1,
nombre:"Napolitana",
precio:8500,
imagen:"../assets/img/napolitana.jpg"
},
{
id:2,
nombre:"Muzzarella",
precio:8000,
imagen:"../assets/img/muzzarella.webp"
},
{
id:3,
nombre:"Especial",
precio:9500,
imagen:"../assets/img/especial.jpg"
},
{
id:4,
nombre:"Calabresa",
precio:10000,
imagen:"../assets/img/calabresa.jpg"
},
{
id:5,
nombre:"Cuatro Quesos",
precio:10500,
imagen:"../assets/img/cuatroquesos.jpeg"
},
{
id:6,
nombre:"Fugazzetta",
precio:9000,
imagen:"../assets/img/fugazzetta.webp"
}
];

localStorage.setItem("pizzas", JSON.stringify(pizzas));
}

/* =========================
   RENDER PIZZAS
========================= */
const contenedor = document.getElementById("pizzasContainer");

function renderPizzas(){

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

/* =========================
   AGREGAR AL CARRITO
========================= */
function addPizza(id){

let pizza = pizzas.find(p => p.id === id);

if(!pizza) return;

let item = carrito.find(i => i.id === id);

if(item){
item.cantidad += 1;
} else {
carrito.push({
id: pizza.id,
nombre: pizza.nombre,
precio: pizza.precio,
cantidad: 1
});
}

saveCarrito();
renderCarrito();

}

/* =========================
   GUARDAR CARRITO
========================= */
function saveCarrito(){
localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* =========================
   RENDER CARRITO
========================= */
function renderCarrito(){

let ul = document.getElementById("carrito");

ul.innerHTML = "";

if(carrito.length === 0){
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

/* =========================
   CONFIRMAR PEDIDO
========================= */
function confirmar() {

  if (carrito.length === 0) {
    alert("Carrito vacío");
    return;
  }

  let session = JSON.parse(localStorage.getItem("user"));

  if (!session) return;

  let nuevoPedido = {
    id: Date.now(),

    // 🔥 IMPORTANTE: guardar nombre real
    user: session.user,  

    role: session.role,

    fecha: new Date().toLocaleString(),

    estado: "Pendiente",

    items: [...carrito],

    total: carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
  };

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  carrito = [];
  localStorage.removeItem("carrito");

  renderCarrito();

  alert("Pedido creado ✔");
}

/* INIT */
renderPizzas();
renderCarrito();