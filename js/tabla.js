const tabla = document.getElementById("tablaUsuarios");

let usuarios = JSON.parse(localStorage.getItem("usuarios"));
if (usuarios === null) {
    usuarios = [];
}

for (let i = 0; i < usuarios.length; i++) {
    const fila = document.createElement("tr");
    fila.innerHTML =
        "<td>" + usuarios[i].nombre + "</td>" +
        "<td>" + usuarios[i].apellido + "</td>" +
        "<td>" + usuarios[i].telefono + "</td>" +
        "<td>" + usuarios[i].comuna + "</td>";
    tabla.appendChild(fila);
}