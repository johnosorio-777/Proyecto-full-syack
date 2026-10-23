const PCS = [
    { nombre: "PC Gamer Básico", rango: "Media", specs: "Ryzen 5 / 16GB / RTX 3050", precio: 599990 },
    { nombre: "PC Gamer Pro", rango: "Alta", specs: "Ryzen 7 / 32GB / RTX 4070", precio: 1199990 },
    { nombre: "PC Gamer Ultra", rango: "Extrema", specs: "Ryzen 9 / 64GB / RTX 4090", precio: 2499990 }
];

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito === null) {
        carrito = [];
    }

    let encontrado = false;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            if (carrito[i].cantidad) {
                carrito[i].cantidad = carrito[i].cantidad + 1;
            } else {
                carrito[i].cantidad = 2;
            }
            encontrado = true;
        }
    }

    if (!encontrado) {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(nombre + " agregado al carrito");
}