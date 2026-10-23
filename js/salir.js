function cerrarSesion() {
    if (confirm("¿Seguro que quieres cerrar sesión?")) {
        localStorage.removeItem("usuarioActivo");
        window.location = "index.html";
    }
}

const btnSalir = document.getElementById("btnSalir");

if (btnSalir !== null) {
    btnSalir.addEventListener("click", function (event) {
        event.preventDefault();
        cerrarSesion();
    });
}