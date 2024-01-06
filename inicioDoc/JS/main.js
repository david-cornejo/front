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
            fetch(`http://localhost:8090/api/doctores/${idUsuario}/citas`, {
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
                        title: cita.titulo, // Asegúrate de que los campos coincidan con tu API
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


      // Función para cargar la lista de pacientes
    function cargarPacientes() {
        const idUsuario = localStorage.getItem('idUsuario'); // Asegúrate de que esta es la clave correcta

        fetch(`http://localhost:8090/api/doctores/${idUsuario}/pacientes`, { // URL de tu API para obtener pacientes
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar otros headers necesarios, como tokens de autenticación
            }
        })
        .then(response => response.json())
        .then(pacientes => {
            const listaPacientes = document.getElementById('listaPacientes');
            listaPacientes.innerHTML = ''; // Limpiar lista actual

            pacientes.forEach(paciente => {
                const elementoPaciente = document.createElement('li');
                const enlacePaciente = document.createElement('a');
                
                // Configurar el enlace para redirigir a la página de detalles del paciente
                enlacePaciente.textContent = `${paciente.nombre} ${paciente.apellidos}`;
                enlacePaciente.href = `detallesPaciente.html?id=${paciente.id}`; // Reemplaza con tu URL real
                enlacePaciente.addEventListener('click', function(event) {
                    event.preventDefault(); // Prevenir la navegación estándar
                    const idPaciente = paciente.id;
                    // Ahora puedes usar el idPaciente como necesites, por ejemplo, redirigir a la página de detalles del paciente
                    window.location.href = `detallesPaciente.html?id=${idPaciente}`;
                });
                elementoPaciente.appendChild(enlacePaciente);
                listaPacientes.appendChild(elementoPaciente);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de pacientes:', error);
        });
    }

    cargarPacientes(); // Llamar a la función al cargar la página
});
