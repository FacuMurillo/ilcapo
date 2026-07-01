protectAdmin();

/* =========================
   DATOS
========================= */

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

/* =========================
   METRICAS BASE
========================= */

let totalPedidos = pedidos.length;

/* clientes únicos */
let clientes = [...new Set(pedidos.map(p => p.cliente))];

/* ingresos */
let ingresos = pedidos.reduce((acc,p)=>acc + (p.total || 0),0);

/* estados */
let estados = {
Pendiente: 0,
"En proceso": 0,
Entregado: 0
};

pedidos.forEach(p=>{
if(estados[p.estado] !== undefined){
estados[p.estado]++;
}
});

/* pizzas vendidas */
let ventas = {};

pedidos.forEach(p=>{
p.items.forEach(i=>{
ventas[i.nombre] = (ventas[i.nombre] || 0) + i.cantidad;
});
});

/* =========================
   CARDS
========================= */

document.getElementById("totalPedidos").innerText = totalPedidos;
document.getElementById("totalClientes").innerText = clientes.length;
document.getElementById("ingresos").innerText = "$" + ingresos;

/* =========================
   CHART 1: ESTADOS
========================= */

new Chart(document.getElementById("chartEstados"), {
type: "doughnut",
data: {
labels: Object.keys(estados),
datasets: [{
data: Object.values(estados),
backgroundColor: ["#facc15","#3b82f6","#22c55e"]
}]
},
options: {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: window.devicePixelRatio || 1
}
});

/* =========================
   CHART 2: TOP PIZZAS
========================= */

let topPizzas = Object.entries(ventas)
.sort((a,b)=>b[1]-a[1])
.slice(0,5);

new Chart(document.getElementById("chartPizzas"), {
type: "bar",
data: {
labels: topPizzas.map(p=>p[0]),
datasets: [{
label: "Unidades vendidas",
data: topPizzas.map(p=>p[1]),
backgroundColor: "#B22222"
}]
},
options: {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: window.devicePixelRatio || 1
}
});