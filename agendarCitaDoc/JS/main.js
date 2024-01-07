document.addEventListener("DOMContentLoaded", function() {
    const docId = localStorage.getItem('idUsuario'); // Asegúrate de que 'userId' es la clave correcta

    var atrasButton = document.getElementById("atras");

    if (atrasButton) {
        atrasButton.addEventListener("click", function () {
            window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
        });
    }

    function getUserIdFromURL() {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('id'); // Asegúrate de que 'userID' coincida con el nombre del parámetro en tu URL
    }

    function toCSTDate(date, time) { // Crear una fecha en hora local
        const localDate = new Date(date + 'T' + time);
        const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
        const gmtPlus6Date = new Date(utcDate.getTime() - 6 * 60 * 60000);
        return gmtPlus6Date.toISOString();
    }

    const crearCitaButton = document.getElementById("crearCita");
    if (crearCitaButton) {
        crearCitaButton.addEventListener("click", function() {  
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const fechaCST = toCSTDate(fecha, hora);

            const cita = {                        
                idPaciente: getUserIdFromURL(),
                inicio: fechaCST,
                cedulaProfesional: docId
            };

            fetch('http://localhost:8090/api/usuarios/crearcitaDoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cita),
            })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes manejar la respuesta del servidor si es necesario
                console.log('Cita creada:', data);
                alert('Cita agendada exitosamente');
                window.location.href = 'inicioDoc.html'; 
                
            })
            .catch(error => {
                console.error('Error al crear la cita:', error);
            });
        });
    }
});
