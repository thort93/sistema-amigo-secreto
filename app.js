let amigos = [];
let amigoSecreto = []; // Lista para almacenar los amigos ya sorteados

// FUN__MOSTRAR NOTIFICACIONES
function mostrarNotificacion(mensaje, tipo = "info") {
    const contenedor = document.getElementById("notifyid");
    const notificacion = document.createElement("div");
    notificacion.classList.add("notificacion");

    notificacion.innerHTML = `
        <span>${mensaje}</span>
        <button class="cerrar-notificacion" onclick="this.parentElement.remove()">✖</button>
    `;

    contenedor.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// FUN__agregar amigos
function agregarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nombreAmigo = inputAmigo.value.trim();

    if (nombreAmigo === "") {
        mostrarNotificacion("Debe insertar un nombre.", "error");
        return;
    }

    const regexSoloTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regexSoloTexto.test(nombreAmigo)) {
        mostrarNotificacion("El nombre solo debe contener letras y caracteres válidos.", "error");
        return;
    }

    if (amigos.includes(nombreAmigo)) {
        mostrarNotificacion("El nombre ingresado ya existe.", "error");
        return;
    }

    amigos.push(nombreAmigo);
    inputAmigo.value = "";
    actualizarListaAmigos();
    
}

// FUN_ACTUALIZAR LISTA
function actualizarListaAmigos() {
    const listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;

        // Si el amigo ya fue sorteado, se deshabilita visualmente
        if (amigoSecreto.includes(amigo)) {
            
            li.style.visibility= "hidden";
            
        }

        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length === 0) {
        mostrarNotificacion("No hay amigos en la lista para sortear.", "error");
        return;
    }

    // FILTRA AMIGOS SIN SORTEAR
    const amigosDisponibles = amigos.filter((amigo) => !amigoSecreto.includes(amigo));

    if (amigosDisponibles.length === 0) {
        mostrarNotificacion("Todos los amigos han sido sorteados. El juego ha terminado.", "success");

        // CAMBIAR BOTON A NUEVO SORTEO
        cambiarBotonANuevoSorteo();
        return;
    }

    const resultado = document.getElementById("resultado");

    // INHABILITAMOS EL CAMPO DE ENTRADA Y AÑADIR
    document.getElementById("amigo").disabled = true;
    document.querySelector(".button-add").disabled = true;

    // INDICE ALEATORIO
    const indiceFinal = Math.floor(Math.random() * amigosDisponibles.length);
    const amigoSorteado = amigosDisponibles[indiceFinal];


            amigos=[];
            document.getElementById("listaAmigos").innerHTML="";

           // AGREGAR EL AMIGO SECRETO A LA LISTA 
           amigoSecreto.push(amigoSorteado);

            // MUESTRA RESULTADO
            resultado.innerHTML = `El amigo secreto es: <strong>${amigoSorteado}</strong>`;
          
            // VERIFICA SI TODOS FUERON SORTEADOS
            if (amigos.length===0) {
                mostrarNotificacion("se ha seleccionado al amigo secreto. El juego ha terminado.", "success");
                cambiarBotonANuevoSorteo();
            }
 
}

// FUNCION PARA CAMBIAR EL BOTON A NUEVO SORTEO
function cambiarBotonANuevoSorteo() {
    const botonSortear = document.querySelector(".button-draw");
    botonSortear.textContent = "Nuevo Sorteo";
    botonSortear.onclick = reiniciarJuego;

    // MANTENER EL DISEÑO ORIGINAL DEL BOTON
    const icono = document.createElement("img");
    icono.src = "assets/reiniciar.png";
    icono.alt = "Ícono para reiniciar";
    botonSortear.prepend(icono);
}

// FUNCION PARA REINICIAR EL JUEGO
function reiniciarJuego() {
    amigos = [];
    amigoSecreto = [];
    document.getElementById("amigo").disabled = false;
    document.querySelector(".button-add").disabled = false;
    document.getElementById("amigo").value = "";
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";

    // CAMBIAMOS DE NUEVO EL BOTON A "Sortear amigo"
    const botonSortear = document.querySelector(".button-draw");
    botonSortear.textContent = "Sortear amigo";
    botonSortear.onclick = sortearAmigo;

    const icono = document.createElement("img");
    icono.src = "assets/play_circle_outline.png";
    icono.alt = "Ícono para sortear";
    botonSortear.prepend(icono);

    mostrarNotificacion("El juego ha sido reiniciado.", "success");
}