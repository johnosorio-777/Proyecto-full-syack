function leer(nombre) {
    let lista = JSON.parse(localStorage.getItem(nombre));
    if (lista === null) {
        lista = [];
    }
    return lista;
}

function guardar(nombre, lista) {
    localStorage.setItem(nombre, JSON.stringify(lista));
}

function iniciarCarrito() {
    const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (sesion === null) {
        alert("Debes iniciar sesión para ver el carrito");
        window.location = "index.html";
        return;
    }

    document.getElementById("emailUsuario").textContent = sesion.email;

    const tablaCarrito = document.getElementById("tablaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const mensajeVacio = document.getElementById("mensajeVacio");
    const contenidoCarrito = document.getElementById("contenidoCarrito");

    function mostrarCarrito() {
        const carrito = leer("carrito");
        tablaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            mensajeVacio.style.display = "block";
            contenidoCarrito.style.display = "none";
            return;
        }

        mensajeVacio.style.display = "none";
        contenidoCarrito.style.display = "block";

        let total = 0;

        for (let i = 0; i < carrito.length; i++) {
            const item = carrito[i];
            let cantidad = 1;
            if (item.cantidad) {
                cantidad = item.cantidad;
            }
            const subtotal = Number(item.precio) * cantidad;
            total = total + subtotal;

            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = item.nombre;

            const celdaPrecio = document.createElement("td");
            celdaPrecio.textContent = "$" + Number(item.precio).toLocaleString("es-CL");

            const celdaCantidad = document.createElement("td");
            const contenedor = document.createElement("div");
            contenedor.className = "cantidad";

            const botonMenos = document.createElement("button");
            botonMenos.textContent = "-";
            botonMenos.addEventListener("click", function () {
                cambiarCantidad(i, -1);
            });

            const numero = document.createElement("span");
            numero.textContent = cantidad;

            const botonMas = document.createElement("button");
            botonMas.textContent = "+";
            botonMas.addEventListener("click", function () {
                cambiarCantidad(i, 1);
            });

            contenedor.appendChild(botonMenos);
            contenedor.appendChild(numero);
            contenedor.appendChild(botonMas);
            celdaCantidad.appendChild(contenedor);

            const celdaSubtotal = document.createElement("td");
            celdaSubtotal.textContent = "$" + subtotal.toLocaleString("es-CL");

            const celdaQuitar = document.createElement("td");
            const botonQuitar = document.createElement("button");
            botonQuitar.className = "quitar";
            botonQuitar.textContent = "Quitar";
            botonQuitar.addEventListener("click", function () {
                quitarProducto(i);
            });
            celdaQuitar.appendChild(botonQuitar);

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaPrecio);
            fila.appendChild(celdaCantidad);
            fila.appendChild(celdaSubtotal);
            fila.appendChild(celdaQuitar);
            tablaCarrito.appendChild(fila);
        }

        totalCarrito.textContent = "$" + total.toLocaleString("es-CL");
    }

    function cambiarCantidad(posicion, cambio) {
        const carrito = leer("carrito");
        let cantidad = 1;
        if (carrito[posicion].cantidad) {
            cantidad = carrito[posicion].cantidad;
        }
        cantidad = cantidad + cambio;

        if (cantidad < 1) {
            carrito.splice(posicion, 1);
        } else {
            carrito[posicion].cantidad = cantidad;
        }

        guardar("carrito", carrito);
        mostrarCarrito();
    }

    function quitarProducto(posicion) {
        const carrito = leer("carrito");
        carrito.splice(posicion, 1);
        guardar("carrito", carrito);
        mostrarCarrito();
    }

    document.getElementById("btnVaciar").addEventListener("click", function () {
        if (confirm("¿Seguro que quieres vaciar el carrito?")) {
            guardar("carrito", []);
            mostrarCarrito();
        }
    });

    document.getElementById("btnComprar").addEventListener("click", function () {
        const carrito = leer("carrito");

        if (carrito.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        let total = 0;
        for (let i = 0; i < carrito.length; i++) {
            let cantidad = 1;
            if (carrito[i].cantidad) {
                cantidad = carrito[i].cantidad;
            }
            total = total + Number(carrito[i].precio) * cantidad;
        }

        const pedidos = leer("pedidos");
        pedidos.push({
            fecha: new Date().toLocaleDateString("es-CL"),
            cliente: sesion.email,
            pago: document.getElementById("pagoSelect").value,
            total: total
        });
        guardar("pedidos", pedidos);
        guardar("carrito", []);

        alert("Compra realizada. Total: $" + total.toLocaleString("es-CL"));
        mostrarCarrito();
    });

    document.getElementById("btnSalir").addEventListener("click", function (event) {
        event.preventDefault();

        if (confirm("¿Seguro que quieres cerrar sesión?")) {
            localStorage.removeItem("usuarioActivo");
            window.location = "index.html";
        }
    });

    mostrarCarrito();
}

iniciarCarrito();