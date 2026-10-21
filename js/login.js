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

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios === null) {
        usuarios = [];
    }

    let usuarioEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
        const u = usuarios[i];
        const emailGuardado = String(u.email || u.correo || "").trim().toLowerCase();
        const claveGuardada = String(u.clave || u.contrasena || u["contraseña"] || u.password || "");

        if (emailGuardado === email && claveGuardada === clave) {
            usuarioEncontrado = { email: emailGuardado, clave: claveGuardada };
        }
    }

    if (usuarioEncontrado === null) {
        alert("Correo o contraseña incorrectos. Si no tienes cuenta, regístrate.");
        return false;
    }

    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
    window.location = "dashboard.html";
});