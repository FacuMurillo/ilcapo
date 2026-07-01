let stock = JSON.parse(localStorage.getItem("stock")) || {
mozzarella: 20,
salsa: 15,
prepizza: 40,
jamon: 8,
anchoas: 5,
ternera: 5,
calabresa: 5,
roquefort: 5
};

function render(){

document.getElementById("mozz").innerText = (stock.mozzarella || 0) + " kg";
document.getElementById("salsa").innerText = (stock.salsa || 0) + " L";
document.getElementById("prepizza").innerText = (stock.prepizza || 0) + " u";
document.getElementById("jamon").innerText = (stock.jamon || 0) + " kg";
document.getElementById("anchoas").innerText = stock.anchoas + " kg";
document.getElementById("ternera").innerText = stock.ternera + " kg";
document.getElementById("calabresa").innerText = stock.calabresa + " kg";
document.getElementById("roquefort").innerText = stock.roquefort + " kg";

color("anchoasCard", stock.anchoas);
color("terneraCard", stock.ternera);
color("calabresaCard", stock.calabresa);
color("roquefortCard", stock.roquefort);

color("mozzCard", stock.mozzarella);
color("salsaCard", stock.salsa);
color("prepCard", stock.prepizza);
color("jamonCard", stock.jamon);

localStorage.setItem("stock", JSON.stringify(stock));

}

function color(id, value){
let el = document.getElementById(id);

if(value <= 2){
el.style.background = "#fecaca";
} else if(value <= 5){
el.style.background = "#fef9c3";
} else {
el.style.background = "#dcfce7";
}
}

/* NUEVO SISTEMA */
function reponerStock(){

let ing = document.getElementById("ingrediente").value;
let cant = Number(document.getElementById("cantidad").value);

if(!cant || cant <= 0){
alert("Ingresá una cantidad válida");
return;
}

if(!stock[ing]){
stock[ing] = 0;
}

stock[ing] += cant;

render();

alert("Stock actualizado ✔");

document.getElementById("cantidad").value = "";

}