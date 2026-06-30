protectAdmin();

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

/* TOTAL PEDIDOS */
document.getElementById("totalPedidos").innerText = pedidos.length;

/* CLIENTES */
let clientes = [...new Set(pedidos.map(p => p.user))];
document.getElementById("totalClientes").innerText = clientes.length;

/* VENTAS ESTIMADAS */
document.getElementById("ventas").innerText =
"$" + (pedidos.length * 8500);

/* PIZZAS VENDIDAS */
let totalPizzas = 0;

pedidos.forEach(p => {
totalPizzas += p.items.length;
});

document.getElementById("pizzasVendidas").innerText = totalPizzas;

/* ULTIMOS PEDIDOS */
let ult = document.getElementById("ultimosPedidos");

pedidos.slice(-5).reverse().forEach(p => {
let li = document.createElement("li");
li.innerText = `${p.user} - ${p.items.join(", ")}`;
ult.appendChild(li);
});