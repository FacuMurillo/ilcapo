protectAdmin();

/* pedidos a proveedor */
let pedidosProveedor = JSON.parse(localStorage.getItem("pedidosProveedor")) || [];

function hacerPedidoProveedor(){

let proveedor = document.getElementById("proveedor").value;
let ingrediente = document.getElementById("ingrediente").value;
let cantidad = parseInt(document.getElementById("cantidad").value);

if(!cantidad || cantidad <= 0){
alert("Cantidad inválida");
return;
}

let pedido = {
id: Date.now(),
proveedor,
ingrediente,
cantidad,
estado: "Pendiente",
fecha: new Date().toLocaleString()
};

pedidosProveedor.push(pedido);

localStorage.setItem("pedidosProveedor", JSON.stringify(pedidosProveedor));

alert("Pedido enviado al proveedor ✔");

document.getElementById("cantidad").value = "";
}