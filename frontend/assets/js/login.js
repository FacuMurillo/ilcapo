// =========================
// LOGIN IL CAPO ERP
// =========================

let usuarios = JSON.parse(localStorage.getItem("users")) || [];

/* Crear usuarios por defecto la primera vez */
if (usuarios.length === 0) {

  usuarios = [
    {
      user: "admin",
      pass: "1234",
      role: "admin"
    },
    {
      user: "cliente",
      pass: "1234",
      role: "cliente"
    }
  ];

  localStorage.setItem("users", JSON.stringify(usuarios));

}

// =========================
// LOGIN
// =========================

function login() {

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!user || !pass) {
    alert("Completa usuario y contraseña");
    return;
  }

  const found = usuarios.find(
    u => u.user === user && u.pass === pass
  );

  if (!found) {
    alert("Usuario o contraseña incorrectos");
    return;
  }

  const session = {
    user: found.user,
    role: found.role,
    loginTime: Date.now()
  };

  localStorage.setItem("user", JSON.stringify(session));
  localStorage.setItem("token", "fake-token-" + Date.now());

  if (found.role === "admin") {
    window.location.href = "./admin/dashboard.html";
  } else {
    window.location.href = "./cliente/home.html";
  }

}

// =========================
// REGISTER
// =========================

function register() {

  const user = document.getElementById("user").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!user || !pass) {
    alert("Completa todos los campos");
    return;
  }

  const existe = usuarios.find(u => u.user === user);

  if (existe) {
    alert("Ese usuario ya existe");
    return;
  }

  usuarios.push({
    user,
    pass,
    role: "cliente"
  });

  localStorage.setItem("users", JSON.stringify(usuarios));

  alert("Usuario registrado correctamente ✔");

}

// =========================
// PROTECCIÓN DE PÁGINAS
// =========================

function protectAdmin() {

  const session = JSON.parse(localStorage.getItem("user"));

  if (!session || session.role !== "admin") {
    window.location.href = "../login.html";
  }

}

function protectClient() {

  const session = JSON.parse(localStorage.getItem("user"));

  if (!session || session.role !== "cliente") {
    window.location.href = "../login.html";
  }

}

// =========================
// LOGOUT
// =========================

function logout() {

  localStorage.removeItem("user");
  localStorage.removeItem("token");

  window.location.href = "../login.html";

}