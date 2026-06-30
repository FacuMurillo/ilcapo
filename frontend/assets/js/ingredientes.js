let stock = {
mozzarella: 2,
salsa: 1,
prepizza: 5,
jamon: 1
};

function render(){

document.getElementById("mozz").innerText = stock.mozzarella + " kg";
document.getElementById("salsa").innerText = stock.salsa + " L";
document.getElementById("prepizza").innerText = stock.prepizza + " u";
document.getElementById("jamon").innerText = stock.jamon + " kg";

// colores tipo sistema real
color("mozzCard", stock.mozzarella);
color("salsaCard", stock.salsa);
color("prepCard", stock.prepizza);
color("jamonCard", stock.jamon);

}

function color(id, value){
let el = document.getElementById(id);

if(value <= 2){
el.style.background = "#fecaca"; // rojo
} else if(value <= 5){
el.style.background = "#fef9c3"; // amarillo
} else {
el.style.background = "#dcfce7"; // verde
}
}

// simulación de compra proveedor
function reponer(){

stock.mozzarella += 10;
stock.salsa += 10;
stock.prepizza += 20;
stock.jamon += 5;

render();
alert("✅ Stock repuesto por proveedor");
}

render();