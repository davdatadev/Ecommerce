const form = document.getElementById('resetPasswordForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/reset-password', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => {
        if (json.status === 'success') {
            alert("Contraseña cambiada exitosamente!");
            window.location.replace('/login');
        } else {
            // Aquí mostramos el error (ej: "Token expirado" o "Misma contraseña")
            alert(json.message);
            
            // Si el token expiró, lo mandamos a pedir uno nuevo
            if(json.message.includes('expirado')) {
                window.location.replace('/forgot-password');
            }
        }
    });
});