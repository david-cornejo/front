document.addEventListener('DOMContentLoaded', function() {    
    var atrasButton = document.getElementById("atras");
    if (atrasButton) {
        atrasButton.addEventListener("click", function () {
            window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
    });
    }
    const idUsuario = localStorage.getItem('idUsuario'); // Asegúrate de que 'idUsuario' es la clave correcta

    function cargarTratamiento() {
        fetch(`http://localhost:8090/api/usuarios/tratamiento/${idUsuario}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Agrega aquí otros headers necesarios, como tokens de autenticación
            }
        })
        .then(response => response.json())
        .then(tratamiento => {
            document.getElementById('medicamento').value = tratamiento.medicamento;
            document.getElementById('fechaInicio').value = tratamiento.fechaInicio;
            document.getElementById('fechaFinal').value = tratamiento.fechaFinal;
            document.getElementById('enfermedad').value = tratamiento.enfermedad;
        })
        .catch(error => {
            console.error('Error al cargar el tratamiento:', error);
        });
    }

    cargarTratamiento();
});
