function leer(nombre) {
    let lista = JSON.parse(localStorage.getItem(nombre));
    if (lista === null) {
        lista = [];
    }
    return lista;
}

function iniciarProductos() {
    const sesion = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (sesion === null) {
        alert("Debes iniciar sesión para entrar a productos");
        window.location = "index.html";
        return;
    }

    const formulario = document.getElementById("formularioProducto");
    const tituloFormulario = document.getElementById("tituloFormulario");
    const nombreInput = document.getElementById("nombreInput");
    const categoriaInput = document.getElementById("categoriaInput");
    const precioInput = document.getElementById("precioInput");
    const stockInput = document.getElementById("stockInput");
    const descripcionInput = document.getElementById("descripcionInput");
    const btnGuardar = document.getElementById("btnGuardar");
    const btnCancelar = document.getElementById("btnCancelar");
    const buscarInput = document.getElementById("buscarInput");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const tablaProductos = document.getElementById("tablaProductos");

    // null = agregando. Si tiene un número, es el id del producto que se edita.
    let idEditando = null;

    function limpiarFormulario() {
        formulario.reset();
        idEditando = null;
        tituloFormulario.textContent = "Agregar producto";
        btnGuardar.textContent = "Agregar producto";
        btnCancelar.hidden = true;
    }

    function crearCelda(texto) {
        const celda = document.createElement("td");
        celda.textContent = texto;
        return celda;
    }

    function mostrarProductos() {
        const productos = leer("productos");
        const texto = buscarInput.value.trim().toLowerCase();
        const categoria = filtroCategoria.value;

        tablaProductos.innerHTML = "";

        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];

            if (p.nombre.toLowerCase().indexOf(texto) === -1) {
                continue;
            }
            if (categoria !== "" && p.categoria !== categoria) {
                continue;
            }

            const fila = document.createElement("tr");
            fila.appendChild(crearCelda(p.nombre));
            fila.appendChild(crearCelda(p.categoria));
            fila.appendChild(crearCelda("$" + p.precio));
            fila.appendChild(crearCelda(p.stock));

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.addEventListener("click", function () {
                editarProducto(p.id);
            });

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btnEliminar";
            btnEliminar.addEventListener("click", function () {
                eliminarProducto(p.id);
            });

            const celdaAcciones = document.createElement("td");
            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);
            fila.appendChild(celdaAcciones);

            tablaProductos.appendChild(fila);
        }
    }

    function editarProducto(id) {
        const productos = leer("productos");

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === id) {
                nombreInput.value = productos[i].nombre;
                categoriaInput.value = productos[i].categoria;
                precioInput.value = productos[i].precio;
                stockInput.value = productos[i].stock;
                descripcionInput.value = productos[i].descripcion;

                idEditando = id;
                tituloFormulario.textContent = "Editar producto";
                btnGuardar.textContent = "Guardar cambios";
                btnCancelar.hidden = false;
                window.scrollTo(0, 0);
            }
        }
    }

    function eliminarProducto(id) {
        if (!confirm("¿Seguro que quieres eliminar este producto?")) {
            return;
        }

        const productos = leer("productos");
        const restantes = [];

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id !== id) {
                restantes.push(productos[i]);
            }
        }

        localStorage.setItem("productos", JSON.stringify(restantes));

        if (idEditando === id) {
            limpiarFormulario();
        }

        mostrarProductos();
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const categoria = categoriaInput.value;
        const precio = Number(precioInput.value);
        const stock = Number(stockInput.value);
        const descripcion = descripcionInput.value.trim();

        if (nombre === "") {
            alert("El nombre es obligatorio");
            return false;
        }

        if (categoria === "") {
            alert("Selecciona una categoría");
            return false;
        }

        if (precioInput.value === "" || precio <= 0) {
            alert("El precio debe ser mayor a 0");
            return false;
        }

        if (stockInput.value === "" || stock < 0) {
            alert("El stock debe ser 0 o mayor");
            return false;
        }

        const productos = leer("productos");

        if (idEditando === null) {
            productos.push({
                id: Date.now(),
                nombre: nombre,
                categoria: categoria,
                precio: precio,
                stock: stock,
                descripcion: descripcion
            });
        } else {
            for (let i = 0; i < productos.length; i++) {
                if (productos[i].id === idEditando) {
                    productos[i].nombre = nombre;
                    productos[i].categoria = categoria;
                    productos[i].precio = precio;
                    productos[i].stock = stock;
                    productos[i].descripcion = descripcion;
                }
            }
        }

        localStorage.setItem("productos", JSON.stringify(productos));
        limpiarFormulario();
        mostrarProductos();
    });

    btnCancelar.addEventListener("click", limpiarFormulario);
    buscarInput.addEventListener("input", mostrarProductos);
    filtroCategoria.addEventListener("change", mostrarProductos);

    document.getElementById("btnSalir").addEventListener("click", function (event) {
        event.preventDefault();

        if (confirm("¿Seguro que quieres cerrar sesión?")) {
            localStorage.removeItem("usuarioActivo");
            window.location = "index.html";
        }
    });

    mostrarProductos();
}

iniciarProductos();