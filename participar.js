const imprimirLog = (dato) => console.log(dato);
let chances = 1;
let pregRespondidas = 0;
let numGanador = Math.floor(Math.random() * 10) + 1;
let ganador = false;
let numElegido
function sumatoriaChances (pregunta) {
    if (pregunta != 0) {
        chances++;
        pregRespondidas++;
    }
}

let btnParticipar = document.getElementById ("btnParticipar")

btnParticipar.addEventListener("click", function () {

    const nombre = document.getElementById("nombreUsuario").value;
    imprimirLog ('Nombre y Apellido del usuario: '+nombre);

    const email = document.getElementById ("correoUsuario").value;
    imprimirLog('E-mail del usuario: '+email);

    const telefono = document.getElementById ("telefonoUsuario").value;
    imprimirLog ('Telefono del usuario: '+nombre);

    const sumaChances = prompt ('Gracias por participar, enviaremos los resultados a '+email+'. Tenes 1 chance, contesta unas preguntas y suma más! Responde "SI", si queres aumentar tus chances: ');

    if (sumaChances.toLocaleLowerCase() == 'si') {
        alert ('Responde del 1 al 5 siendo 1 Nada Importante y 5 Muy Importante. Empecemos!');
        imprimirLog ('Suma Chances: '+sumaChances);

        let pregImportancia;
        do {
            pregImportancia = prompt ('Para vos, que tan importante es registrar toda Tu Gestión? Recorda responder del 1 al 5. Pone 0 si queres saltear la pregunta');
        } while (!(pregImportancia >=0 && pregImportancia <=5));
        sumatoriaChances (pregImportancia);

        let pregOrden;
        do {
            pregOrden = prompt ('Para los registros de Tu Gestión, que tan importante consideras el orden? Recorda responder del 1 al 5. Pone 0 si queres saltear la pregunta.');
        } while (!(pregOrden >=0 && pregOrden <=5));
        sumatoriaChances (pregOrden);

        let pregNotificaciones;

        do {
            pregNotificaciones = prompt ('Que tan importante es tener notificaciones para que no se pase nada de Tu Gestión? Recorda responder del 1 al 5. Pone 0 si queres saltear la pregunta.');
        } while (!(pregNotificaciones >=0 && pregNotificaciones <=5));
        sumatoriaChances (pregNotificaciones);

        let pregReporte;
        do {
            pregReporte = prompt ('Consideras importante tener reportería que te describa en detalle Tu Gestión? Recorda responder del 1 al 5. Pone 0 si queres saltear la pregunta.');
        } while (!(pregReporte >=0 && pregReporte <=5));
        sumatoriaChances (pregReporte);

        imprimirLog ('Importancia: '+pregImportancia);
        imprimirLog ('Orden: '+pregOrden);
        imprimirLog ('Notificaciones: '+pregNotificaciones);
        imprimirLog ('Reporteria: '+pregReporte);
        alert('Respondiste '+pregRespondidas+' preguntas, por lo que quedaste con '+chances+' chances. ¡Vamos al sorteo!');
    } else {
        imprimirLog ('Suma Chances: No');
        alert('No respondiste ninguna pregunta, tenes '+chances+' chance. ¡Vamos al sorteo!');
    }

    imprimirLog ('Chances para sorteo: '+chances);

    while (chances != 0) {
        let numElegido = parseInt(prompt ("Adivina el número del 1 al 10, te quedan " + (chances) + " intentos"));
        if (numGanador==numElegido) {
            alert('¡¡¡Ganaste!!! Tenemos un mes de prueba gratis de Tu Gestión FULL. Enviaremos todo al correo que nos proporcionaste. Podes ir probando ahora');
            chances--
            ganador = true;
            break;
        } else if (isNaN(numElegido) || numElegido < 1 || numElegido > 10){
            alert('Elegí un numero del 1 al 10.');
        } else if (chances == 1){
            alert('Lo lamentamos, el número ganador era el '+ numGanador +'. Te quedaste sin chances, pero no te preocupes! Recomendanos a un compañero de trabajo, para que pueda participar con su correo y ambos prueben Tu Gestión.')
            chances--
        } else if (numGanador > numElegido){
            alert('Chico, chiquito, pequeño, tu numero no es el correcto.');
            chances--;
        } else if (numGanador < numElegido || numElegido <= 10){
            alert('Grande, grandote, tu numero es enorme.');
            chances--;
        }
    }

    imprimirLog ('Ganador : '+ganador);
    imprimirLog ('Numero Ganador: '+numGanador);
    imprimirLog ('Numero Elegido: '+numElegido);
    imprimirLog ('Chances restantes: '+chances);

})
