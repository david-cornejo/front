document.addEventListener("DOMContentLoaded", function() {
    var atrasButton = document.getElementById("atras");

    if (atrasButton) {
    atrasButton.addEventListener("click", function () {
        window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
    });
    }
    const idUsuario = localStorage.getItem('idUsuario'); // Asegúrate de que 'idUsuario' es la clave correcta

    function cargarDetallesDoctor() {
        fetch(`http://localhost:8090/api/usuarios/detalles/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Agrega aquí otros headers necesarios, como tokens de autenticación
            }
        })
        .then(response => response.json())
        .then(doctor => {
            // Asegúrate de que los nombres de los campos coincidan con tu API
            document.getElementById('nombreDoctor').textContent = 'Dr. ' + doctor[0].nombre + ' ' + doctor[0].apellidos;
            document.getElementById('cedulaDoctor').textContent = `Cédula profesional: ${doctor[0].cedulaProfesional}`;
            document.getElementById('telefonoDoctor').textContent = doctor[0].telefono;
            document.getElementById('correoDoctor').textContent = doctor[0].correo;
            document.getElementById('ubicacionDoctor').textContent = doctor[0].ubicacion;
        })
        .catch(error => {
            console.error('Error al cargar los detalles del doctor:', error);
        });
    }

    cargarDetallesDoctor();
});