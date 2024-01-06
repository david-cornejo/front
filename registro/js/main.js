document.addEventListener("DOMContentLoaded", function () {
  var pacienteRadio = document.getElementById("paciente");
  var doctorRadio = document.getElementById("doctor");
  var cedulaProfesionalGroup = document.getElementById("cedulaProfesionalGroup");
  var hospitalDoctorGroup = document.getElementById("hospitalDoctorGroup");
  var formDatosPersonales = document.getElementById('registrationFormDatosPersonales');
  var formCuenta = document.getElementById('registrationFormCuenta');
  var cedulaProfesionalInput = document.getElementById("cedulaProfesional");
  var temporaryData = {}; // Almacenamiento temporal para los datos del primer formulario
  var atrasButton = document.getElementById("atras");

  if (atrasButton) {
    atrasButton.addEventListener("click", function () {
      window.history.back(); // Esta función de JavaScript te llevará a la página anterior en el historial del navegador.
    });
  }
  // Event listeners para cambiar la visibilidad de campos basados en el tipo de usuario
  if (pacienteRadio && doctorRadio) {
    pacienteRadio.addEventListener("change", function () {  
      if (cedulaProfesionalGroup) {
        cedulaProfesionalGroup.classList.remove("d-none");
        cedulaProfesionalInput.placeholder = "Ingresa la Cédula Profesional de tu Médico";
      }
      if (hospitalDoctorGroup) {
        hospitalDoctorGroup.classList.add("d-none");
      }
    });

    doctorRadio.addEventListener("change", function () {
      if (cedulaProfesionalGroup) {
        cedulaProfesionalGroup.classList.remove("d-none");        
        cedulaProfesionalInput.placeholder = "Ingresa tu Cédula Profesional";
      }
      if (hospitalDoctorGroup) {
        hospitalDoctorGroup.classList.remove("d-none");
      }
    });
  } 

 // Manejo del envío del primer formulario
  if(formDatosPersonales){
    formDatosPersonales.addEventListener('submit', function(event) {
      event.preventDefault();

      // Almacenamos los datos del primer formulario temporalmente en LocalStorage
      var datosPersonales = {
          nombre: document.getElementById('nombre').value,
          apellidos: document.getElementById('apellidos').value,
          telefono: document.getElementById('telefono').value,
          fechaDeNacimiento: document.getElementById('fechaDeNacimiento').value,
          tipoUsuario: document.querySelector('input[name="tipoUsuario"]:checked').value,
          cedulaProfesional: document.getElementById('cedulaProfesional').value,
          ubicacion: document.getElementById('ubicacion').value
      };

      localStorage.setItem('datosPersonales', JSON.stringify(datosPersonales));
      
      window.location.href = 'cuenta.html'; // Redirigimos al segundo formulario
  });
  }
  
  // Manejo del envío del segundo formulario
  if(formCuenta){
    formCuenta.addEventListener('submit', function(event) {
      event.preventDefault();

      // Recuperamos los datos del primer formulario de LocalStorage
      var datosPersonales = JSON.parse(localStorage.getItem('datosPersonales'));

      // Combinamos los datos del segundo formulario con los almacenados
      var userData = {
          ...datosPersonales,
          correo: document.getElementById('correo').value,
          contraseña: document.getElementById('contraseña').value
      };

      // Enviamos la solicitud a la API
      fetch('http://localhost:8090/api/usuarios/crear', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          alert('Registro exitoso');
          window.location.href = 'login.html'; 
          // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
      })
      .catch((error) => {
          console.error('Error:', error);
          alert('error en el registro' + error.message);
          // Aquí puedes manejar errores, como mostrar un mensaje de error
      });
  });
  }
});
