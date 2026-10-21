const formularioLogin = document.getElementById("formularioLogin");

formularioLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value.trim().toLowerCase();
    const clave = document.getElementById("claveInput").value;

    if (email === '') {
        alert("El correo es obligatorio");
        return false;
    }

    if (clave === '') {
        alert("La contraseña es obligatoria");
        return false;
    }

    // Buscamos si existe un usuario con ese correo y esa contraseña
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios === null) {
        usuarios = [];
    }

    let usuarioEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email && usuarios[i].clave === clave) {
            usuarioEncontrado = usuarios[i];
        }
    }

    if (usuarioEncontrado === null) {
        alert("Correo o contraseña incorrectos. Si no tienes cuenta, regístrate.");
        return false;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    window.location = "dashboard.html";
});