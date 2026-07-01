protectClient();

/*==============================
      DATOS
==============================*/

let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const catalogo = document.getElementById("catalogo");
const buscador = document.getElementById("buscar");
const contador = document.getElementById("contadorCarrito");

/*==============================
SI NO EXISTEN PIZZAS
CREAMOS LAS PREDEFINIDAS
==============================*/

if(pizzas.length===0){

pizzas=[

{
id:1,
nombre:"Napolitana",
descripcion:"Mozzarella, tomate fresco y orégano.",
precio:8500,
stock:15,
categoria:"Clásicas",
imagen:"../assets/img/pizzas/napolitana.jpg"
},

{
id:2,
nombre:"Especial",
descripcion:"Mozzarella, jamón y aceitunas.",
precio:9800,
stock:12,
categoria:"Especiales",
imagen:"../assets/img/pizzas/especial.jpg"
},

{
id:3,
nombre:"Muzzarella",
descripcion:"La clásica de mozzarella.",
precio:7900,
stock:20,
categoria:"Clásicas",
imagen:"../assets/img/pizzas/muzzarella.jpg"
},

{
id:4,
nombre:"Fugazzetta",
descripcion:"Cebolla caramelizada y mozzarella.",
precio:9300,
stock:14,
categoria:"Especiales",
imagen:"../assets/img/pizzas/fugazzetta.jpg"
},

{
id:5,
nombre:"Cuatro Quesos",
descripcion:"Mozzarella, parmesano, roquefort y provolone.",
precio:10500,
stock:10,
categoria:"Especiales",
imagen:"../assets/img/pizzas/cuatroquesos.jpg"
},

{
id:6,
nombre:"Ternera",
descripcion:"Ternera, mozzarella y salsa.",
precio:11000,
stock:8,
categoria:"Especiales",
imagen:"../assets/img/pizzas/ternera.jpg"
},

{
id:7,
nombre:"Anchoas",
descripcion:"Mozzarella y anchoas.",
precio:9900,
stock:9,
categoria:"Especiales",
imagen:"../assets/img/pizzas/anchoas.jpg"
},

{
id:8,
nombre:"Roquefort",
descripcion:"Mozzarella y queso roquefort.",
precio:9800,
stock:11,
categoria:"Especiales",
imagen:"../assets/img/pizzas/roquefort.jpg"
},

{
id:9,
nombre:"Calabresa",
descripcion:"Mozzarella y salame calabrés.",
precio:10200,
stock:13,
categoria:"Especiales",
imagen:"../assets/img/pizzas/calabresa.jpg"
}

];

localStorage.setItem("pizzas",JSON.stringify(pizzas));

}

/*==============================
RENDER PIZZAS
==============================*/

function renderPizzas(lista){

catalogo.innerHTML="";

lista.forEach(pizza=>{

catalogo.innerHTML+=`

<div class="pizza-card">

<div class="pizza-img">

<img src="${pizza.imagen}" alt="${pizza.nombre}">

</div>

<div class="pizza-info">

<h3>${pizza.nombre}</h3>

<p>${pizza.descripcion}</p>

<span class="stock">

Stock disponible: ${pizza.stock}

</span>

<div class="precio">

$${pizza.precio}

</div>

<button class="agregar"

onclick="agregarCarrito(${pizza.id})">

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

buscador.addEventListener("keyup",()=>{

const texto=buscador.value.toLowerCase();

const filtradas=pizzas.filter(p=>

p.nombre.toLowerCase().includes(texto)

);

renderPizzas(filtradas);

});

/*==============================
INICIO
==============================*/

renderPizzas(pizzas);

actualizarContador();

/*==============================
      CARRITO - AGREGAR
==============================*/

function agregarCarrito(id){

let pizza = pizzas.find(p=>p.id===id);

let item = carrito.find(p=>p.id===id);

if(item){

item.cantidad++;

}else{

carrito.push({
id:pizza.id,
nombre:pizza.nombre,
precio:pizza.precio,
imagen:pizza.imagen,
cantidad:1
});

}

guardarCarrito();
actualizarContador();
mostrarToast("Agregado al carrito");

}

/*==============================
GUARDAR CARRITO
==============================*/

function guardarCarrito(){

localStorage.setItem("carrito",JSON.stringify(carrito));

}

/*==============================
CONTADOR
==============================*/

function actualizarContador(){

let total=carrito.reduce((acc,p)=>acc+p.cantidad,0);

contador.innerText=total;

}

/*==============================
MOSTRAR CARRITO
==============================*/

const carritoPanel=document.getElementById("carrito");
const fondo=document.getElementById("fondoOscuro");
const itemsCarrito=document.getElementById("itemsCarrito");
const totalCarrito=document.getElementById("totalCarrito");

document.getElementById("abrirCarrito").onclick=()=>{

carritoPanel.classList.add("active");
fondo.classList.add("active");

renderCarrito();

};

document.getElementById("cerrarCarrito").onclick=()=>{

carritoPanel.classList.remove("active");
fondo.classList.remove("active");

};

fondo.onclick=()=>{

carritoPanel.classList.remove("active");
fondo.classList.remove("active");

};

/*==============================
RENDER CARRITO
==============================*/

function renderCarrito(){

itemsCarrito.innerHTML="";

let total=0;

carrito.forEach(item=>{

total+=item.precio*item.cantidad;

itemsCarrito.innerHTML+=`

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

totalCarrito.innerText="$"+total;

}

/*==============================
SUMAR / RESTAR
==============================*/

function sumar(id){

let item=carrito.find(p=>p.id===id);

item.cantidad++;

guardarCarrito();
renderCarrito();
actualizarContador();

}

function restar(id){

let item=carrito.find(p=>p.id===id);

item.cantidad--;

if(item.cantidad<=0){

carrito=carrito.filter(p=>p.id!==id);

}

guardarCarrito();
renderCarrito();
actualizarContador();

}

/*==============================
TOAST
==============================*/

function mostrarToast(msg){

let toast=document.getElementById("toast");

toast.innerText=msg;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2000);

}
/*==============================
    FINALIZAR PEDIDO
==============================*/

document.getElementById("finalizarCompra").onclick = ()=>{

if(carrito.length===0){
mostrarToast("El carrito está vacío");
return;
}

/* CREAR PEDIDO */

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

let nuevoPedido = {

id:Date.now(),

cliente:localStorage.getItem("user") || "cliente",

fecha:new Date().toLocaleDateString(),

estado:"Pendiente",

items: carrito.map(p => ({
    id: p.id,
    nombre: p.nombre,
    precio: p.precio,
    cantidad: p.cantidad
})),

total:carrito.reduce((acc,p)=>acc+p.precio*p.cantidad,0)

};

pedidos.push(nuevoPedido);

localStorage.setItem("pedidos",JSON.stringify(pedidos));

/* DESCONTAR STOCK */

let pizzasLS = JSON.parse(localStorage.getItem("pizzas")) || [];

carrito.forEach(item=>{

let pizza = pizzasLS.find(p=>p.id===item.id);

if(pizza){

pizza.stock -= item.cantidad;

if(pizza.stock < 0) pizza.stock = 0;

}

});

localStorage.setItem("pizzas",JSON.stringify(pizzasLS));

/* LIMPIAR CARRITO */

carrito = [];

localStorage.removeItem("carrito");

actualizarContador();

renderCarrito();

mostrarToast("Pedido realizado con éxito 🎉");

/* CERRAR PANEL */

document.getElementById("carrito").classList.remove("active");

document.getElementById("fondoOscuro").classList.remove("active");

/* RECARGAR CATÁLOGO */

pizzas = pizzasLS;

renderPizzas(pizzas);

};