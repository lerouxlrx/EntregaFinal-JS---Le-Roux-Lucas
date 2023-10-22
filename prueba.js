
//Función para imprimir, quedo de antes.
const imprimirLog = (dato) => console.log(dato);

//Creador Contacto
class Contacto {
    constructor (nombreApellido, telefono, correo, actividad) {
    this.nombreApellido = nombreApellido.toLocaleUpperCase();
    this.telefono = parseInt(telefono);
    this.correo = correo.toLowerCase();
    this.actividad = [];
}
agregarActividad(actividad) {
    this.actividad.push(actividad);
}
}

//Variables necesarias
let Contactos = [];
const htmlContactos = document.getElementById("htmlContactos");
const btnContacto = document.getElementById("btnContacto");
const btnActividad = document.getElementById("btnActividad");

//Funciones para ahorrar código
function sinContactos () {
    const agregarMensaje = document.createElement ('article');
    agregarMensaje.innerHTML = `
        <h6>-Sin Contactos-</h6>
        <p>Agrega uno para poder crear una actividad</p>
    `
    htmlContactos.appendChild(agregarMensaje);
}

function guardarStorage () {
    const jsonContactos = JSON.stringify(Contactos);
    localStorage.setItem("Contactos",jsonContactos); 
}

function alertaSweet (icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
      })
}

function alertaTostify (text) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

function removerContactos () {
    while (htmlContactos.firstChild) {
        htmlContactos.removeChild(htmlContactos.firstChild);
    }
}

function contactoPush (nombre, telefono, correo) {
    Contactos.push(new Contacto(nombre, telefono, correo));
    guardarStorage ();
    /*      alertaSweet ('success','Contacto guardado con éxito','Ya podes crear actividad sobre '+nombreContacto); */
    alertaTostify ('Contacto guardado');
    mostrarContactos();

    document.getElementById("nombreContacto").value = "";
    document.getElementById("correoContacto").value = "";
    document.getElementById("telefonoContacto").value = "";
}

//Funciones operativas
function mostrarContactos () {

    const misContactos = JSON.parse(localStorage.getItem("Contactos"));

    if (misContactos && misContactos.length != 0) {
        let contador = 0;
        removerContactos ()

/*         imprimirLog('Control Contactos recuperados de Storage:');
        imprimirLog(misContactos)  ;
        imprimirLog('Control Contactos al ingresar a forEach:');
        imprimirLog(Contactos); */
        misContactos.forEach(({nombreApellido, telefono, correo, actividad}) => {
            contador++;
            const agregarContacto = document.createElement ('article');
            agregarContacto.className = 'tarjetaContacto';
            agregarContacto.id = contador;

            const actividadesDiv = document.createElement('div');
        
            actividad.forEach(actividad => {
                const actividadHtml = document.createElement('p');
                actividadHtml.innerHTML = `
                <span class='fechaNegrita'>${actividad.dateActividad}:</span> ${actividad.textActividad}
            `
                actividadesDiv.appendChild (actividadHtml)
                
            });

            agregarContacto.innerHTML = `
                <h6 class='nombreTarjeta'>${nombreApellido}</h6>
                <p class='correoTarjeta'>${correo}</p>
                <p class='telefonoTarjeta'>${telefono}</p>
                <h7 class='actividadTarjeta'>Actividades:</h6>
            `
            agregarContacto.appendChild(actividadesDiv);
            const btnEliminar = document.createElement('button');
            btnEliminar.id = `btn.${contador}`;
            btnEliminar.className = 'btnEliminar';
            btnEliminar.type = 'button';
            btnEliminar.textContent = 'Eliminar';
            agregarContacto.appendChild(btnEliminar);

            htmlContactos.appendChild(agregarContacto);
        });
    } else {
        removerContactos ()
        sinContactos ()
    }
}

async function validarCorreoContacto(correo) {
    const apiKey = 'fc22fd0017a64654a0ddc1e5a7e887ad';
    const url = `https://emailvalidation.abstractapi.com/v1?api_key=${apiKey}&email=${correo}&auto_correct=false`;
    let data
    try {
        const response = await fetch(url, { method: 'GET' })
        data = await response.json ()
    
        return data.deliverability
    } catch (error) {
        return  'DELIVERABLE'    
    } finally {
        imprimirLog ('Validación de correo '+correo+': '+data.deliverability)
    }
}

async function crearContacto () {
    const nombreContacto = document.getElementById("nombreContacto").value;
    const correoContacto = document.getElementById("correoContacto").value;
    const telefonoContacto = document.getElementById("telefonoContacto").value;  

    (nombreContacto == "" || correoContacto == "" || telefonoContacto == "")
        ? alertaSweet ('error','Hay campos vacios','Debes completar todos los campos.')
        :(correoContacto.toLocaleUpperCase() == "NO TIENE" )
            ? contactoPush (nombreContacto, telefonoContacto, nombreContacto+'@'+telefonoContacto)
            :  (await validarCorreoContacto(correoContacto) == 'DELIVERABLE')
                ? contactoPush (nombreContacto, telefonoContacto, correoContacto)
                : alertaSweet ('error','Correo fallo la validación','El correo '+correoContacto+' no paso la validación. Ponga un correo valido o escriba en el campo correo NO TIENE')
}

function crearActividad() {
    const fecha = luxon.DateTime.now().toFormat('dd-mm-yy hh:mm')
    let contactoEncontrado;
    let correoBuscado = document.getElementById("correoBuscado").value;
    let nuevaActividad = {
        textActividad: document.getElementById("nuevaActividad").value,
        dateActividad: fecha,
    }
    let {textActividad, dateActividad} = nuevaActividad
    imprimirLog ('Control fecha antes de crear actividad: ')
    imprimirLog (fecha)
    imprimirLog (dateActividad)
/*  imprimirLog('Control contactos antes de crear actividad: ');
    imprimirLog(Contactos); */

    if (correoBuscado == "" || textActividad == "") {
        alertaSweet ('error','Hay campos vacios','Debes completar con el correo de un contacto y la actividad que quieras guardar.');
    } else {
        contactoEncontrado = Contactos.find(Contacto => Contacto.correo === correoBuscado);
        if (contactoEncontrado) {
            imprimirLog('El contacto encontrado es:');
            imprimirLog(contactoEncontrado);
/*          imprimirLog('Control contactos al momento de crear actividad: ');
            imprimirLog(Contactos); */
            imprimirLog('Nueva actividad a agregar: ');
            imprimirLog(nuevaActividad);
            contactoEncontrado.agregarActividad(nuevaActividad);
            guardarStorage ();
/*          alertaSweet ('success','Actividad guardada con éxito','Ya podes visualizar tu actividad en el contacto con mail: '+correoBuscado); */
            alertaTostify ('Actividad guardada')
            document.getElementById("correoBuscado").value = "";
            document.getElementById("nuevaActividad").value = "";
            mostrarContactos();
        } else {
/*          imprimirLog('Control contactos al momento de NO encontrar actividad: ');
            imprimirLog(Contactos); */
            alertaSweet ('error','Correo no encontrado','Debes completar con el correo de uno de tus contactos.');
        }
    }     
}

function eliminarContacto (id) {
    const posicionEliminar = id-1
    Contactos.splice (posicionEliminar,1)
    imprimirLog(Contactos)
    guardarStorage ()
    mostrarContactos ()
}

//Inicio
mostrarContactos ()

//Eventos
btnContacto.addEventListener("click", crearContacto);
btnActividad.addEventListener("click", crearActividad);
document.addEventListener('click',  (e) => {
    if (e.target && e.target.classList.contains('btnEliminar')) {
        const id = e.target.parentElement.id;
        eliminarContacto(id);
    }
});

