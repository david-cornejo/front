document.addEventListener('DOMContentLoaded', function() {
    const idUsuario = localStorage.getItem('idUsuario'); // Asegúrate de que esta es la clave correcta

    // Inicialización de FullCalendar
    $('#calendar').fullCalendar({
        locale: 'es',  
        timezone: 'local',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: function(start, end, timezone, callback) {
            fetch(`http://localhost:8090/api/usuarios/${idUsuario}/citas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Aquí puedes agregar otros headers necesarios, como tokens de autenticación
                }
            })
            .then(response => response.json())
            .then(citas => {
                var eventos = citas.map(cita => {
                    return {
                        title: 'Con ' + cita.nombreDoctor + ' en ' + cita.ubicacionDoctor,
                        start: cita.inicio,
                        end: cita.fin
                    };
                });
                callback(eventos);
            })
            .catch(error => {
                console.error('Error al cargar las citas:', error);
            });
        }
        // ... otras opciones de FullCalendar ...
    });
    function convertISODateToDMY(isoDate) {
        const date = new Date(isoDate);
        const day = ('0' + date.getDate()).slice(-2); // Agrega un cero al inicio y toma los últimos 2 caracteres
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
    
        return `${year}-${month}-${day}`;
    }

    function convertirFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        const dia = ('0' + fecha.getDate()).slice(-2);
        const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const año = fecha.getFullYear();
        const horas = ('0' + fecha.getHours()).slice(-2);
        const minutos = ('0' + fecha.getMinutes()).slice(-2);
        return `${dia}/${mes}/${año} ${horas}:${minutos}`;
    }

    // Función para cargar la lista de citas médicas
    function cargarCitas() {
        fetch(`http://localhost:8090/api/usuarios/${idUsuario}/citas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar otros headers necesarios
            }
        })
        .then(response => response.json())
        .then(citas => {
            const listaCitas = document.getElementById('listaCitas');
            listaCitas.innerHTML = '';
            citas.forEach(cita => {
                const fechaFormateada = convertirFecha(cita.inicio);
                const elementoCita = document.createElement('li');
                elementoCita.textContent = `Cita con el Doctor ${cita.nombreDoctor} en ${cita.ubicacionDoctor} el día ${fechaFormateada} hrs.`;
                listaCitas.appendChild(elementoCita);
            });
        })
        .catch(error => {
            console.error('Error al cargar las citas:', error);
        });
    }

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

            const fechaIformat = convertISODateToDMY(tratamiento.fechaInicio);
            document.getElementById('fechaInicio').value = fechaIformat;

            const fechaFformat = convertISODateToDMY(tratamiento.fechaFinal);
            document.getElementById('fechaFinal').value = fechaFformat;

            document.getElementById('enfermedad').value = tratamiento.enfermedad;
        })
        .catch(error => {
            console.error('Error al cargar el tratamiento:', error);
        });
    }
    cargarTratamiento();
    cargarCitas(); // Llamar a la función al cargar la página
});
