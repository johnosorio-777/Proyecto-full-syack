<<<<<<< HEAD
const sesion = JSON.parse(localStorage.getItem("sesion"));
=======
const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));
>>>>>>> feature/carrito
if (sesion === null) {
    window.location.href = "index.html";
}

document.getElementById("btnSalir").addEventListener("click", function (event) {
    event.preventDefault();
<<<<<<< HEAD
    localStorage.removeItem("sesion");
=======
    localStorage.removeItem("usuarioActivo");
>>>>>>> feature/carrito
    window.location.href = "index.html";
});

const listaPcs = document.getElementById("listaPcs");
const botonesFiltro = document.querySelectorAll(".filtros button");

function mostrarPcs(rango) {
    listaPcs.innerHTML = "";
    for (let i = 0; i < PCS.length; i++) {
        const pc = PCS[i];
        if (rango === "Todos" || pc.rango === rango) {
            const tarjeta = document.createElement("div");
            tarjeta.className = "pc";
            const etiqueta = document.createElement("span");
            etiqueta.className = "rango " + pc.rango;
            etiqueta.textContent = "Gama " + pc.rango;
            const titulo = document.createElement("h3");
            titulo.textContent = pc.nombre;
            const specs = document.createElement("p");
            specs.className = "specs";
            specs.textContent = pc.specs;
            const precio = document.createElement("p");
            precio.className = "precio";
            precio.textContent = "$" + pc.precio.toLocaleString("es-CL");
            const boton = document.createElement("button");
            boton.textContent = "Agregar al carrito";
            boton.addEventListener("click", function () {
                agregarAlCarrito(pc.nombre, pc.precio);
            });
            tarjeta.appendChild(etiqueta);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(specs);
            tarjeta.appendChild(precio);
            tarjeta.appendChild(boton);
            listaPcs.appendChild(tarjeta);
        }
    }
}

for (let i = 0; i < botonesFiltro.length; i++) {
    botonesFiltro[i].addEventListener("click", function () {
        for (let j = 0; j < botonesFiltro.length; j++) {
            botonesFiltro[j].classList.remove("activo");
        }
        botonesFiltro[i].classList.add("activo");
        mostrarPcs(botonesFiltro[i].dataset.rango);
    });
}

mostrarPcs("Todos");