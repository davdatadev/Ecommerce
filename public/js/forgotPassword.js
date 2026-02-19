const form = document.getElementById('forgotPasswordForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/forgot-password', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            alert("Correo enviado! Revisa tu bandeja de entrada (y spam).");
        } else {
            alert("No se pudo enviar el correo. Verifica que el usuario exista.");
        }
    });
});