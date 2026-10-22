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

    // null = estamos agregando. Si tiene un número, estamos editando ese producto.
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
        let mostrados = 0;

        for (let i = 0; i < productos.length; i++) {
            const p = productos[i];

            if (p.nombre.toLowerCase().indexOf(texto) === -1) {
                continue;
            }
            if (categoria !== "" && p.categoria !== categoria) {
                continue;
            }

            mostrados = mostrados + 1;

            const fila = document.createElement("tr");
            fila.appendChild(crearCelda(p.nombre));
            fila.appendChild(crearCelda(p.categoria));
            fila.appendChild(crearCelda("$" + p.precio.toLocaleString("es-CL")));

            const celdaStock = crearCelda(p.stock);
            if (p.stock <= 5) {
                celdaStock.classList.add("stockBajo");
                if (p.stock === 0) {
                    celdaStock.textContent = "0 (sin stock)";
                } else {
                    celdaStock.textContent = p.stock + " (poco stock)";
                }
            }
            fila.appendChild(celdaStock);

            const celdaAcciones = document.createElement("td");

            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.className = "btnEditar";
            btnEditar.addEventListener("click", function () {
                editarProducto(p.id);
            });

            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.className = "btnEliminar";
            btnEliminar.addEventListener("click", function () {
                eliminarProducto(p.id);
            });

            celdaAcciones.appendChild(btnEditar);
            celdaAcciones.appendChild(btnEliminar);
            fila.appendChild(celdaAcciones);

            tablaProductos.appendChild(fila);
        }

        if (mostrados === 0) {
            const fila = document.createElement("tr");
            const celda = document.createElement("td");
            celda.colSpan = 5;
            celda.className = "vacio";

            if (productos.length === 0) {
                celda.textContent = "Aún no hay productos. Agrega el primero con el formulario.";
            } else {
                celda.textContent = "No hay productos que coincidan con la búsqueda.";
            }

            fila.appendChild(celda);
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
                nombreInput.focus();
            }
        }
    }

    function eliminarProducto(id) {
        const productos = leer("productos");
        const restantes = [];
        let nombreEliminado = "";

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id === id) {
                nombreEliminado = productos[i].nombre;
            } else {
                restantes.push(productos[i]);
            }
        }

        if (!confirm("¿Seguro que quieres eliminar \"" + nombreEliminado + "\"?")) {
            return;
        }

        localStorage.setItem("productos", JSON.stringify(restantes));

        // Si justo se estaba editando este producto, se limpia el formulario
        if (idEditando === id) {
            limpiarFormulario();
        }

        mostrarProductos();
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const categoria = categoriaInput.value;
        const precioTexto = precioInput.value;
        const stockTexto = stockInput.value;
        const descripcion = descripcionInput.value.trim();

        if (nombre === "") {
            alert("El nombre es obligatorio");
            return false;
        }

        if (nombre.length < 3) {
            alert("El nombre debe tener mínimo 3 caracteres");
            return false;
        }

        if (nombre.length > 60) {
            alert("El nombre no puede tener más de 60 caracteres");
            return false;
        }

        if (categoria === "") {
            alert("Selecciona una categoría");
            return false;
        }

        if (precioTexto === "") {
            alert("El precio es obligatorio");
            return false;
        }

        const precio = Number(precioTexto);
        if (!Number.isInteger(precio) || precio <= 0) {
            alert("El precio debe ser un número entero mayor a 0");
            return false;
        }

        if (stockTexto === "") {
            alert("El stock es obligatorio");
            return false;
        }

        const stock = Number(stockTexto);
        if (!Number.isInteger(stock) || stock < 0) {
            alert("El stock debe ser un número entero (0 o mayor)");
            return false;
        }

        if (descripcion.length > 200) {
            alert("La descripción no puede tener más de 200 caracteres");
            return false;
        }

        const productos = leer("productos");

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre.toLowerCase() === nombre.toLowerCase() && productos[i].id !== idEditando) {
                alert("Ya existe un producto con ese nombre");
                return false;
            }
        }

        if (idEditando === null) {
            productos.push({
                id: Date.now(),
                nombre: nombre,
                categoria: categoria,
                precio: precio,
                stock: stock,
                descripcion: descripcion
            });
            alert("Producto agregado");
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
            alert("Producto actualizado");
        }

        localStorage.setItem("productos", JSON.stringify(productos));
        limpiarFormulario();
        mostrarProductos();
    });

    btnCancelar.addEventListener("click", function () {
        limpiarFormulario();
    });

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