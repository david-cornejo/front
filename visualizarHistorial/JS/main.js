document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('idUsuario'); // Asegúrate de que 'userId' es la clave correcta

    var atrasButton = document.getElementById("atras");

    if (atrasButton) {
      atrasButton.addEventListener("click", function () {
        window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
      });
    }

    // Cargar datos del usuario
    function loadUserData() {
        if (!userId) {
            console.error('No se encontró el ID del usuario');
            return;
        }

        fetch(`http://localhost:8090/api/usuarios/historial/${userId}`, { // Asegúrate de que la URL sea correcta
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar headers adicionales si son necesarios, como un token de autenticación
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('descripcion').textContent = data.descripcionHistorial;
        })
        .catch(error => {
            console.error('Error al cargar datos del usuario:', error);
        });
    }

    loadUserData();
});
