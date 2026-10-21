// Proteger la página: si no hay sesión, volver al login
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
if (usuarioActivo === null) {
    window.location = "index.html";
}

document.getElementById("emailUsuario").textContent = usuarioActivo.email;
document.getElementById("perfilEmail").textContent = usuarioActivo.email;

// Lista de usuarios y contador
let usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (usuarios === null) {
    usuarios = [];
}

document.getElementById("totalUsuarios").textContent = usuarios.length;

const tabla = document.getElementById("tablaUsuarios");
for (let i = 0; i < usuarios.length; i++) {
    const fila = document.createElement("tr");
    fila.innerHTML = "<td>" + (i + 1) + "</td><td>" + usuarios[i].email + "</td>";
    tabla.appendChild(fila);
}

// Navegación entre secciones
const items = document.querySelectorAll(".menu-item[data-seccion]");
const secciones = document.querySelectorAll(".seccion");

items.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();

        items.forEach(function (i) { i.classList.remove("active"); });
        secciones.forEach(function (s) { s.classList.remove("activa"); });

        item.classList.add("active");
        document.getElementById(item.dataset.seccion).classList.add("activa");
        document.getElementById("sidebar").classList.remove("abierto");
    });
});

// Menú hamburguesa (celular)
document.getElementById("btnMenu").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("abierto");
});

// Cerrar sesión
document.getElementById("btnSalir").addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("usuarioActivo");
    window.location = "index.html";
});