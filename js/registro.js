const formularioRegistro = document.getElementById("formularioRegistro");

formularioRegistro.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value.trim().toLowerCase();
    const clave = document.getElementById("claveInput").value;

    if (email === '') {
        alert("El correo es obligatorio");
        return false;
    }

    if (clave.length < 6) {
        alert("La contraseña debe tener mínimo 6 caracteres");
        return false;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios === null) {
        usuarios = [];
    }

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
            alert("Ese correo ya está registrado");
            return false;
        }
    }

    usuarios.push({ email: email, clave: clave });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cuenta creada. Ahora inicia sesión.");
    window.location = "index.html";
});
