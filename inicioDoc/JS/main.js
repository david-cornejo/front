document.addEventListener('DOMContentLoaded', function() {
    // ... tu código existente ...

    // Inicialización de FullCalendar
    $('#calendar').fullCalendar({
        locale: 'es',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        // Eventos de ejemplo que puedes obtener de tu backend
        events: [
            {
                title: 'Cita con Paciente 1',
                start: '2024-01-07T10:00:00',
                end: '2024-01-07T12:00:00'
            },
            // ... más eventos ...
        ],
        // Otras opciones y configuraciones... 
    });
});
