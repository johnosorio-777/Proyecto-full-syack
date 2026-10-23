function leer(nombre) {
    let lista = JSON.parse(localStorage.getItem(nombre));
    if (lista === null) {
        lista = [];
    }
    return lista;
}

function iniciarDashboard() {
    const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (sesion === null) {
        alert("Debes iniciar sesión para entrar al dashboard");
        window.location = "index.html";
        return;
    }

    const usuarios = leer("usuarios");
    let usuario = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === sesion.email) {
            usuario = usuarios[i];
        }
    }

    if (usuario === null) {
        alert("Tu cuenta no está registrada. Regístrate para continuar");
        localStorage.removeItem("usuarioActivo");
        window.location = "registro.html";
        return;
    }

    let nombre = usuario.email;
    if (usuario.nombre) {
        nombre = usuario.nombre;
    }

    document.getElementById("nombreBienvenida").textContent = nombre;
    document.getElementById("perfilNombre").textContent = nombre;
    document.getElementById("perfilEmail").textContent = usuario.email;
    document.getElementById("fechaHoy").textContent = new Date().toLocaleDateString("es-CL");

    const productos = leer("productos");
    const pcs = leer("pcs");
    const carrito = leer("carrito");
    const pedidos = leer("pedidos");

    let ventas = 0;
    for (let i = 0; i < pedidos.length; i++) {
        ventas = ventas + Number(pedidos[i].total);
    }

    document.getElementById("kpiProductos").textContent = productos.length;
    document.getElementById("kpiPcs").textContent = pcs.length;
    document.getElementById("kpiCarrito").textContent = carrito.length;
    document.getElementById("kpiPedidos").textContent = pedidos.length;
    document.getElementById("kpiVentas").textContent = "$" + ventas;

    const listaPedidos = document.getElementById("listaPedidos");
    const tablaPedidos = document.getElementById("tablaPedidos");

    if (pedidos.length === 0) {
        listaPedidos.textContent = "Aún no hay pedidos.";
    }

    for (let i = 0; i < pedidos.length; i++) {
        const fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + pedidos[i].fecha + "</td>" +
            "<td>" + pedidos[i].cliente + "</td>" +
            "<td>" + pedidos[i].pago + "</td>" +
            "<td>$" + pedidos[i].total + "</td>";
        tablaPedidos.appendChild(fila);
    }

    const tablaUsuarios = document.getElementById("tablaUsuarios");

    for (let i = 0; i < usuarios.length; i++) {
        const fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + (usuarios[i].nombre || "-") + "</td>" +
            "<td>" + usuarios[i].email + "</td>";
        tablaUsuarios.appendChild(fila);
    }

    const botones = document.querySelectorAll(".menu-item[data-seccion]");
    const secciones = document.querySelectorAll(".seccion");

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function (event) {
            event.preventDefault();

            for (let j = 0; j < botones.length; j++) {
                botones[j].classList.remove("active");
            }
            for (let j = 0; j < secciones.length; j++) {
                secciones[j].classList.remove("activa");
            }

            botones[i].classList.add("active");
            const idSeccion = botones[i].getAttribute("data-seccion");
            document.getElementById(idSeccion).classList.add("activa");
        });
    }

}

iniciarDashboard();
