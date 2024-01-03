document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem('idUsuario'); // Asegúrate de que 'userId' es la clave correcta

    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const editableInputs = document.querySelectorAll('#telefono, #correo, #contrasena');
    var atrasButton = document.getElementById("atras");

    if (atrasButton) {
      atrasButton.addEventListener("click", function () {
        window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
      });
    }
    function convertISODateToDMY(isoDate) {
        const date = new Date(isoDate);
        const day = ('0' + date.getDate()).slice(-2); // Agrega un cero al inicio y toma los últimos 2 caracteres
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
    
        return `${year}-${month}-${day}`;
    }
    
    // Cargar datos del usuario
    function loadUserData() {
        if (!userId) {
            console.error('No se encontró el ID del usuario');
            return;
        }

        fetch(`http://localhost:8090/api/usuarios/${userId}`, { // Asegúrate de que la URL sea correcta
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar headers adicionales si son necesarios, como un token de autenticación
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellidos').value = data.apellidos;
            const fechaFormateada = convertISODateToDMY(data.fechaDeNacimiento);
            document.getElementById('fechaDeNacimiento').value = fechaFormateada;
            document.getElementById('telefono').value = data.telefono;
            document.getElementById('correo').value = data.correo;
            document.getElementById('contrasena').value = data.contraseña; // La contraseña usualmente no se muestra
        })
        .catch(error => {
            console.error('Error al cargar datos del usuario:', error);
        });
    }

    // Habilitar edición
    editBtn.addEventListener('click', function() {
        editableInputs.forEach(input => input.disabled = false);
        editBtn.classList.add('d-none');
        saveBtn.classList.remove('d-none');
    });

    // Guardar cambios
    saveBtn.addEventListener('click', function() {
        const updatedData = {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            fechaDeNacimiento: document.getElementById('fechaDeNacimiento').value,
            telefono: document.getElementById('telefono').value,
            correo: document.getElementById('correo').value,
            contraseña: document.getElementById('contrasena').value
            // ... recolectar otros campos
        };
    
        const userId = localStorage.getItem('idUsuario');
    
        fetch(`http://localhost:8090/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // ... otros headers si son necesarios
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la actualización: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Datos actualizados correctamente');
            // ... acciones adicionales después de la actualización
        })
        .catch(error => {
            console.error('Error en la actualización:', error);
            alert('Actualizacion de datos exitosa');            
            editableInputs.forEach(input => input.disabled = true);
            editBtn.classList.remove('d-none');
            saveBtn.classList.add('d-none');
        });
    });

    // Cargar los datos al inicio
    loadUserData();
});
