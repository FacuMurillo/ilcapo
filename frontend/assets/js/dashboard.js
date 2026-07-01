protectAdmin();

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

/* =========================
   HELPERS
========================= */

function getCliente(p) {
  if (typeof p.user === "string") return p.user;
  if (p.user?.user) return p.user.user;
  return "Cliente";
}

function formatItems(items = []) {
  return items
    .map(i => {
      let nombre = i.nombre || "Producto";
      let cant = i.cantidad || 1;
      return `${nombre} x${cant}`;
    })
    .join(", ");
}

/* =========================
   KPI
========================= */

document.getElementById("totalPedidos").innerText = pedidos.length;

let clientes = [...new Set(pedidos.map(p => getCliente(p)))];
document.getElementById("totalClientes").innerText = clientes.length;

let ingresos = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
document.getElementById("ventas").innerText = "$" + ingresos;

let totalPizzas = pedidos.reduce((acc, p) => {
  return acc + (p.items?.reduce((a, i) => a + (i.cantidad || 0), 0) || 0);
}, 0);

document.getElementById("pizzasVendidas").innerText = totalPizzas;

/* =========================
   ÚLTIMOS PEDIDOS
========================= */

let ult = document.getElementById("ultimosPedidos");

function estadoClass(estado) {
  if (estado === "Pendiente") return "pendiente";
  if (estado === "Entregado") return "entregado";
  if (estado === "Cancelado") return "cancelado";
  return "pendiente";
}

function cambiarEstado(id, estado) {
  pedidos = pedidos.map(p => {
    if (p.id === id) {
      p.estado = estado;
    }
    return p;
  });

  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  render();
}

function render() {
  ult.innerHTML = "";

  pedidos.slice(-5).reverse().forEach(p => {

    let li = document.createElement("li");

    let cliente = getCliente(p);

    // 🔥 ROLE SEGURO
    let rol = p.role || p.user?.role || "cliente";

    // 🔥 FECHA SEGURO
    let hora = p.fecha || new Date(p.id).toLocaleString();

    let items = formatItems(p.items);

    li.innerHTML = `
      <div>
        <b>${cliente}</b> (${rol})<br>
        <small style="color:#888">${hora}</small><br>
        ${items}
      </div>

      <div style="display:flex;gap:6px;align-items:center">
        <span class="${estadoClass(p.estado)}">
          ${p.estado || "Pendiente"}
        </span>

        <button onclick="cambiarEstado(${p.id}, 'Entregado')" style="background:#16a34a">
          Entregado
        </button>

        <button onclick="cambiarEstado(${p.id}, 'Cancelado')" style="background:#dc2626">
          Cancelar
        </button>
      </div>
    `;

    ult.appendChild(li);
  });
}

/* INIT */
render();