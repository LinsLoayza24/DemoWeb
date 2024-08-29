document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío tradicional del formulario

    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();

    if (validateEmail(email)) {
        // Guardar el email en LocalStorage
        localStorage.setItem('userEmail', email);

        // Mostrar mensaje de éxito
        document.getElementById('submitSuccessMessage').classList.remove('d-none');
        document.getElementById('submitErrorMessage').classList.add('d-none');
        emailInput.classList.remove('is-invalid');

        // Mostrar el email guardado en la interfaz
        document.getElementById('savedEmailDisplay').textContent = `Email guardado: ${email}`;

        // Opcional: limpiar el campo de entrada después de guardar
        emailInput.value = '';
    } else {
        // Mostrar mensaje de error
        document.getElementById('submitErrorMessage').classList.remove('d-none');
        document.getElementById('submitSuccessMessage').classList.add('d-none');
        document.getElementById('emailError').textContent = 'Email is not valid.';
        emailInput.classList.add('is-invalid');
    }
});

function validateEmail(email) {
    // Verificar si el email es válido
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mostrar el email almacenado al cargar la página, si existe
window.addEventListener('DOMContentLoaded', (event) => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('savedEmailDisplay').textContent = `Email guardado: ${savedEmail}`;
    }
});

// Función para obtener y mostrar la ubicación
function displayLocation() {
    const locationDisplay = document.getElementById('locationDisplay');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Mostrar la ubicación en la interfaz
            locationDisplay.textContent = `Tu ubicación actual es: Latitud: ${latitude}, Longitud: ${longitude}`;
        }, function(error) {
            locationDisplay.textContent = 'Error obteniendo tu ubicación: ' + error.message;
        });
    } else {
        locationDisplay.textContent = 'La geolocalización no es soportada por este navegador.';
    }
}

// Asigna la función al botón
document.getElementById('getLocationButton').addEventListener('click', displayLocation);

