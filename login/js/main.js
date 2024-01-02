document.getElementById('login').addEventListener('click', function() {
    window.location.href = 'login.html'; 
  });
  
  document.getElementById('registro').addEventListener('click', function() {
    window.location.href = 'registro.html'; 
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
      if (data.tipoUsuario === 'doctor') {
        window.location.href = 'inicioDoc.html'; // Cambia a la página correspondiente para doctores
      } else if (data.tipoUsuario === 'paciente') {
        window.location.href = 'inicioPac.html'; // Cambia a la página correspondiente para pacientes
      } else {
        alert('Tipo de usuario desconocido');
      }
    })
    .catch(function(error) {
      console.error('Error al conectar con la API:', error);
      alert(error.message);
    });
}
  
  // Asegúrate de que esta función esté conectada al botón de inicio de sesión en tu HTML
  document.getElementById('botonLogin').addEventListener('click', iniciarSesion);
  
  