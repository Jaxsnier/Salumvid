let ruta = 'login'; //registro o home
let urlogin = 'https://login-ten-sigma-39.vercel.app/auth/login';
let urlme = 'https://login-ten-sigma-39.vercel.app/auth/me';

var ventanas = [];

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

    var medidas = [                                 //falta comprobar que no faltan datos
        document.getElementById("ventana-cantidad").value,
        document.getElementById("ventana-ancho").value,
        document.getElementById("ventana-alto").value,]

    ventanas.push({
        // Medidas
        id: ventanas.length + 1,
        cantidad: medidas[0],
        ancho: medidas[1],
        alto: medidas[2],
        hojas: -1,
        //Perfiles Marco
        Cant: -1,
        Medida: -1,
        Cant: -1,
        Medida: -1,
        // Perfiles Hoja
        Cant: -1,
        Medida: -1,
        Cant: -1,
        Medida: -1,
        // Vidrio
        Cant: -1,
        Ancho: -1,
        Alto: -1,
        // Goma
        Pie: -1,

    });
    
    //console.log(ventanas)
    
    RenderVentana(ventanas[ventanas.length-1]);  //renderizamos todas las ventanas //luego implementar renderizar solo la ultima
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

const RenderVentana = (ventana) =>
    {
        tbody = document.getElementById("contenido-tabla"); //buscamos contenido actual de la tabla

        const row = `
            <tr>
                <td>${ventana.id}</td>
                <td>${ventana.cantidad ?? ''}</td>
                <td>${ventana.ancho ?? ''}</td>
                <td>${ventana.alto ?? ''}</td>
                <td>${ventana.hojas ?? ''}</td>

                <td>${ventana.marcoLateralesCant ?? ''}</td>
                <td>${ventana.marcoLateralesMed ?? ''}</td>
                <td>${ventana.marcoRielCant ?? ''}</td>
                <td>${ventana.marcoRielMed ?? ''}</td>

                <td>${ventana.hojaCabCant ?? ''}</td>
                <td>${ventana.hojaCabMed ?? ''}</td>
                <td>${ventana.hojaJambaCant ?? ''}</td>
                <td>${ventana.hojaJambaMed ?? ''}</td>

                <td>${ventana.vidrioCant ?? ''}</td>
                <td>${ventana.vidrioAncho ?? ''}</td>
                <td>${ventana.vidrioAlto ?? ''}</td>

                <td>${ventana.Pie ?? ''}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    }

window.onload = () => {
    renderApp();
};