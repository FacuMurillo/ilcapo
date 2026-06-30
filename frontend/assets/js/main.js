const users = [
{ user: "admin", pass: "1234", role: "admin" },
{ user: "cliente", pass: "1234", role: "cliente" }
];

// LOGIN
function login(){

let u = document.getElementById("user").value;
let p = document.getElementById("pass").value;

let found = users.find(x => x.user === u && x.pass === p);

if(!found){
alert("Credenciales incorrectas");
return;
}

localStorage.setItem("user", JSON.stringify(found));

// redirección por rol
redirectByRole(found.role);

}

function redirectByRole(role){

if(role === "admin"){
window.location.href = "admin/dashboard.html";
}

if(role === "cliente"){
window.location.href = "cliente/home.html";
}

}

// obtener usuario actual
function getUser(){
return JSON.parse(localStorage.getItem("user"));
}

// logout global
function logout(){
localStorage.removeItem("user");
window.location.href = "../index.html";
}

// proteger páginas admin
function protectAdmin(){
let user = getUser();

if(!user || user.role !== "admin"){
window.location.href = "../index.html";
}
}

// proteger páginas cliente
function protectClient(){
let user = getUser();

if(!user || user.role !== "cliente"){
window.location.href = "../index.html";
}
}