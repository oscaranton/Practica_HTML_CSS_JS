var form = document.getElementsByClassName("contact")[0];
var nombreInput = document.getElementById("nombre");
var apellidoInput = document.getElementById("apellido");
var emailInput = document.getElementById("email");
var telefonoInput = document.getElementById("telefono");
var originInput = {
  origin1: document.getElementById("origen-contacto-1"),
  origin2: document.getElementById("origen-contacto-2"),
  origin3: document.getElementById("origen-contacto-3"),
  originotro: document.getElementById("origen-contacto-otro"),
  origindetalle: document.getElementById("message-origin")
};
var submitButton = document.getElementById("enviar");

/* Creación de un array con las palabras del texto de mensaje y sin los espacios*/

var mensajeInput;
function checkMensaje() {
  mensajeInput = document.getElementById("message").value.split(" ");
  var espacioEliminar = "";
  for (var i = mensajeInput.length - 1; i >= 0; i--) {
    if (mensajeInput[i] === espacioEliminar) {
      mensajeInput.splice(i, 1);
    }
  }
  return mensajeInput;
}

/* Creación / Eliminacion de un area de texto segun el radio button seleccionado */

var textareatocreate;
function generoCuadroDeTexto() {
  if (document.getElementById("message-origin")) {
  } else {
    textareatocreate = document.createElement("TEXTAREA");
    textareatocreate.setAttribute("name", "message-origin");
    textareatocreate.setAttribute("placeholder", "¿Cómo supiste de mi?");
    textareatocreate.setAttribute("id", "message-origin");
    document
      .getElementById("origen-contacto-otro-detalle")
      .appendChild(textareatocreate);
  }
}

var textareatodelete;
function eliminoCuadroDeTexto() {
  textareatodelete = document.getElementById("origen-contacto-otro-detalle");
  while (textareatodelete.firstChild) {
    textareatodelete.removeChild(textareatodelete.firstChild);
  }
}

/* Validación del boton enviar */

form.addEventListener("submit", function(event) {
  if (nombreInput.checkValidity() === false) {
    alert("Tienes que escribir tu nombre");
    nombreInput.focus();
    event.preventDefault();
    return false;
  }

  if (apellidoInput.checkValidity() === false) {
    alert("Tienes que escribir tu apellido");
    apellidoInput.focus();
    event.preventDefault();
    return false;
  }

  var emailRegex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
  var resultEmailValidation = emailRegex.test(emailInput.value);

  if (resultEmailValidation === false) {
    alert("Tienes que escribir un email correcto");
    emailInput.focus();
    event.preventDefault();
    return false;
  }

  var telefonoRegex = /^((\+?34([ \t|\-])?)?[9|6|7]((\d{1}([ \t|\-])?[0-9]{3})|(\d{2}([ \t|\-])?[0-9]{2}))([ \t|\-])?[0-9]{2}([ \t|\-])?[0-9]{2})$/;
  var resultTelefonoValidation = telefonoRegex.test(telefonoInput.value);

  if (resultTelefonoValidation === false) {
    alert("Tienes que escribir un número de teléfono válido");
    telefonoInput.focus();
    event.preventDefault();
    return false;
  }

  if (originInput.origin1.checkValidity() === false) {
    alert("Tienes que indicar como has sabido de mi");
    event.preventDefault();
    return false;
  }

  if (mensajeInput.length > 150) {
    alert(
      "El texto es demasiado largo. Mira a ver si me puedes decir lo mismo en 150 palabras o menos."
    );
    event.preventDefault();
    mensajeInput.focus();
    return false;
  }

  if ((mensajeInput.length == 0)) {
    alert("Escríbeme algo");
    event.preventDefault();
    mensajeInput.focus();
    return false;
  }

  submitButton.setAttribute("disabled", "");
  event.preventDefault();

  setTimeout(function() {
    //form.reset();
    //sendNotification("Formulario recibido", "Gracias por participar");
    submitButton.removeAttribute("disabled");
    console.log("Mensaje enviado");
  }, 1000);
});
