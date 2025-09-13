let ruta = 'login'; //registro o home
let urlogin = 'https://login-ten-sigma-39.vercel.app/auth/login';
let urlme = 'https://login-ten-sigma-39.vercel.app/auth/me';

let token = localStorage.getItem('token');

const renderApp = () => {
    if (token) {
        return renderHome();
    }
    renderLogin();
}

const renderHome = () => {
    const homeTemplate = document.getElementById('home-template');
    document.getElementById('app').innerHTML = homeTemplate.innerHTML;
    
    const btnAgregarVentana = document.getElementById('btnAgregarVentana'); // Botón "Me Informacion"
    btnAgregarVentana.addEventListener('click', AgregarVentana);
}
const renderLogin = () => {
    const loginTemplate = document.getElementById('login-template');
    document.getElementById('app').innerHTML = loginTemplate.innerHTML;

    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();                 // Evita el envío del formulario

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch(urlogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        }).then(response => response.json())  //error si no es json cuando usuario o pass incorrecto usar 
            .then(data => {
                localStorage.setItem('token', data.token);
                token = data.token;
                ruta = 'home';
                renderHome();
            })

    })
}
const AgregarVentana = () => {
    alert('Funcionalidad en desarrollo.');
}
const InfoMe = () => {
    return fetch(urlme, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            }
        }).then(response => response.json()).then(User => {
            alert(`User Info:\nName: ${User.username}\nOtros datos: ${JSON.stringify(User)}`);
        }).catch(error => {
            alert('Failed to fetch user information.' + token);
        });   
}

window.onload = () => {
    renderApp();
};