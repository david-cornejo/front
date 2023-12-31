document.getElementById('login').addEventListener('click', function() {
    window.location.href = 'login.html'; 
  });
  
  document.getElementById('registro').addEventListener('click', function() {
    window.location.href = 'registro.html'; 
  });
  
  //LOGIN

  function iniciarSesion() {
    var correo = document.getElementById('correo').value;
    var contraseña = document.getElementById('contraseña').value;
  
    var datosLogin = {
      correo: correo, // Asegúrate de que las claves coincidan con lo que tu API espera
      contraseña: contraseña
    };
  
    fetch('http://localhost:8090/api/login', { // La URL de tu API
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
      // Si la API responde con un token, guárdalo y redirige, por ejemplo:
      // localStorage.setItem('token', data.token);
      // Reemplaza '/dashboard' con la URL a la que desees redirigir al usuario después del inicio de sesión
      //window.location.href = '/dashboard';
      alert('inicio exitoso');
    })
    .catch(function(error) {
      console.error('Error al conectar con la API:', error);
      alert(error.message);
      // Aquí podrías actualizar la interfaz de usuario para mostrar un mensaje de error
    });
  }
  