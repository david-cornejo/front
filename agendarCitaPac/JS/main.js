document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('idUsuario'); // Asegúrate de que 'userId' es la clave correcta

    var atrasButton = document.getElementById("atras");

    if (atrasButton) {
        atrasButton.addEventListener("click", function () {
            window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
        });
    }

    function toCSTDate(date, time) { // Crear una fecha en hora local
        const localDate = new Date(date + 'T' + time);
    
        // Convertir a hora UTC
        const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000);
    
        // Restar 6 horas para convertir a GMT+6
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
                idPaciente: localStorage.getItem('idUsuario'),
                inicio: fechaCST,
                cedulaProfesional: document.getElementById('cedulaDoctor').value
            };

            fetch('http://localhost:8090/api/usuarios/crearcita', {
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
                window.location.href = 'inicioPac.html'; 
                
            })
            .catch(error => {
                console.error('Error al crear la cita:', error);
            });
        });
    }
});
