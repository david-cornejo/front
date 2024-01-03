document.addEventListener("DOMContentLoaded", function () {
    var atrasButton = document.getElementById("atras");

    if (atrasButton) {
      atrasButton.addEventListener("click", function () {
        window.location.href = 'index.html' // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
      });
    }
    
    document.getElementById('login').addEventListener('click', function() {
        window.location.href = 'login.html'; 
    });
  
    document.getElementById('registro').addEventListener('click', function() {
        window.location.href = 'registro.html'; 
    });
  
});

function iniciarSesion() {
    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;
    

    var datosLogin = {
        correo: correo,
        contraseña: contraseña
    };

    fetch('http://localhost:8090/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosLogin)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas o error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(function(data) {
        if (data.tipoUsuario && data.idUsuario) {
            // Guardar el ID del usuario y el tipo de usuario en localStorage
            localStorage.setItem('idUsuario', data.idUsuario);
            localStorage.setItem('tipoUsuario', data.tipoUsuario);

            // Redireccionar según el tipo de usuario
            if (data.tipoUsuario === 'doctor') {
                window.location.href = 'inicioDoc.html'; // Cambiar por la URL de la página del doctor
            } else if (data.tipoUsuario === 'paciente') {
                window.location.href = 'inicioPac.html'; // Cambiar por la URL de la página del paciente
            }
        }
    })
    .catch(function(error) {
        console.error('Error al conectar con la API:', error);
        alert(error.message);
    });
}

  // Asegúrate de que esta función esté conectada al botón de inicio de sesión en tu HTML
  document.getElementById('botonLogin').addEventListener('click', iniciarSesion);