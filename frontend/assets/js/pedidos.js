let carrito=[];

const recetas={
especial:{prepizza:1,salsa:0.15,mozzarella:0.3,jamon:0.12},
muzzarella:{prepizza:1,salsa:0.15,mozzarella:0.3},
calabresa:{prepizza:1,salsa:0.15,mozzarella:0.3,calabresa:0.2}
};

// stock global simulado
let stock={
prepizza:10,
salsa:5,
mozzarella:5,
jamon:3,
calabresa:3
};

function render(){
let list=document.getElementById("carrito");
list.innerHTML="";
carrito.forEach((p,i)=>{
let li=document.createElement("li");
li.innerText="🍕 "+p;
li.style.padding="5px 0";
list.appendChild(li);
});
}

function add(p){
carrito.push(p);
render();
}

function confirmar(){

let temp={...stock};

// verificar stock antes
for(let p of carrito){
let r=recetas[p];
for(let ing in r){
if(temp[ing]===undefined || temp[ing]<r[ing]){
alert("❌ No hay stock suficiente");
return;
}
}
}

// descontar
for(let p of carrito){
let r=recetas[p];
for(let ing in r){
temp[ing]-=r[ing];
}
}

stock=temp;

// guardar pedido (simulado)
let pedidos=JSON.parse(localStorage.getItem("pedidos"))||[];
pedidos.push({
fecha:new Date().toLocaleString(),
items:[...carrito]
});
localStorage.setItem("pedidos",JSON.stringify(pedidos));

carrito=[];
render();

alert("✅ Pedido confirmado");
}