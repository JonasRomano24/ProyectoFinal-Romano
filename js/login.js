// ===== MOSTRAR USUARIO EN HEADER =====
function mostrarUsuario() {

    const userArea = document.getElementById("userArea");

    if (!userArea) return; // evita errores si no existe el contenedor

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {

        userArea.innerHTML = `
<span class="user-name">👤 ${usuario.nombre}</span>
<button id="logoutBtn">Salir</button>
`;

        document.getElementById("logoutBtn").addEventListener("click", () => {

            localStorage.removeItem("usuario");
            location.reload();

        });

    } else {

        userArea.innerHTML = `
<button id="btnLogin">Login</button>
<button id="btnRegistro">Registro</button>
`;

        document.getElementById("btnLogin").addEventListener("click", abrirLogin);
        document.getElementById("btnRegistro").addEventListener("click", abrirRegistro);

    }

}


// ===== REGISTRO =====
function abrirRegistro() {

    Swal.fire({
        title: "Registro de usuario",
        html: `
<input id="swal-nombre" class="swal2-input" placeholder="Nombre">
<input id="swal-apellido" class="swal2-input" placeholder="Apellido">
<input id="swal-edad" type="number" class="swal2-input" placeholder="Edad">
<input id="swal-email" type="email" class="swal2-input" placeholder="Email">
`,
        confirmButtonText: "Registrar",

        preConfirm: () => {

            const nombre = document.getElementById("swal-nombre").value.trim();
            const apellido = document.getElementById("swal-apellido").value.trim();
            const edad = document.getElementById("swal-edad").value.trim();
            const email = document.getElementById("swal-email").value.trim();

            if (!nombre || !apellido || !edad || !email) {

                Swal.showValidationMessage("Completa todos los campos");
                return false;

            }

            const usuario = { nombre, apellido, edad, email };

            localStorage.setItem("usuario", JSON.stringify(usuario));

            return usuario;

        }

    }).then((result) => {

        if (result.isConfirmed) {

            Swal.fire({
                icon: "success",
                title: "Registro exitoso"
            });

            mostrarUsuario();

        }

    });

}


// ===== LOGIN =====
function abrirLogin() {

    Swal.fire({
        title: "Iniciar sesión",
        input: "email",
        inputPlaceholder: "Ingresa tu email",
        confirmButtonText: "Ingresar",

        preConfirm: (email) => {

            const usuario = JSON.parse(localStorage.getItem("usuario"));

            if (!email) {

                Swal.showValidationMessage("Ingresa un email");
                return false;

            }

            if (!usuario || usuario.email !== email) {

                Swal.showValidationMessage("Usuario no encontrado");
                return false;

            }

            return usuario;

        }

    }).then((result) => {

        if (result.isConfirmed) {

            Swal.fire({
                icon: "success",
                title: `Bienvenido ${result.value.nombre}`
            });

            mostrarUsuario();

        }

    });

}


// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {

    mostrarUsuario();

});