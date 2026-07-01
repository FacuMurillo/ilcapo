protectAdmin();

let usuarios = JSON.parse(localStorage.getItem("users")) || [];

let lista = document.getElementById("listaClientes");

function renderClientes() {

  lista.innerHTML = "";

  let clientes = usuarios.filter(u => u.role === "cliente");

  if (clientes.length === 0) {
    lista.innerHTML = "<li>No hay clientes registrados</li>";
    return;
  }

  clientes.forEach(c => {

    let li = document.createElement("li");

    li.style.padding = "10px";
    li.style.marginBottom = "8px";
    li.style.background = "#f9fafb";
    li.style.borderRadius = "10px";
    li.style.border = "1px solid #e5e7eb";

    li.innerHTML = `
      <b>Usuario:</b> ${c.user} <br>
      <small style="color:#6b7280">Rol: ${c.role}</small>
    `;

    lista.appendChild(li);

  });

}

renderClientes();