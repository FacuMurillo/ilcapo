protectClient();

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

const contenedor = document.getElementById("listaPedidos");

function renderPedidos(){

contenedor.innerHTML="";

if(pedidos.length===0){
contenedor.innerHTML="<p>No tienes pedidos aún.</p>";
return;
}

pedidos.forEach(p=>{

let itemsTexto = p.items.map(i=>{
return `${i.nombre} x${i.cantidad}`;
}).join(", ");

contenedor.innerHTML+=`
<div class="pedido-card">

<div class="pedido-header">

<span class="pedido-id">#${p.id}</span>

<span class="estado ${estadoClass(p.estado)}">
${p.estado}
</span>

</div>

<div class="pedido-items">
${itemsTexto}
</div>

<div class="pedido-total">
Total: $${p.total}
</div>

<div class="pedido-fecha">
${p.fecha}
</div>

</div>
`;

});

}

function estadoClass(estado){

if(estado==="Pendiente") return "pendiente";
if(estado==="En proceso") return "enproceso";
if(estado==="Entregado") return "entregado";

return "pendiente";

}

renderPedidos();