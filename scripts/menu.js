var navItems = document.getElementsByClassName("nav__item"); //seleccionamos los elementos de la barra de navegación

for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function(event) {
    var goTo = this.getElementsByTagName("a")[0].href.split("#");

    deleteActiveClass();
    this.classList.add("nav__item--active");

    if (goTo.length === 2) { //verifica que el split haya generado un array con sólo dos elementos
      event.preventDefault(); //cancela el comportamiento estandar de navegación
      var sectionToGo = goTo[goTo.length - 1]; //asigna a sectionToGo el valor del ultimo elemento del array goTo - la sección a la que queremos ir.
      var elementToGo = getElementToScroll(sectionToGo);
      scrollToElement(elementToGo);
    }
  });
}

function deleteActiveClass() {
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove("nav__item--active");
  }
}

function getElementToScroll(id) {
  var elem;
  if (id === "") {
    elem = document.getElementsByClassName("header")[0]; //si id (la seccion a la que queremos ir) está vacio a elem se le asigna el primer elemento de la clase header.
  } else {
    elem = document.getElementById(id); //si no está vacio se le asigna a elem
  }

  return elem;
}

function scrollToElement(element) {
  jump = parseInt(element.getBoundingClientRect().top * 0.25); //calcula el valor (en enteros) del salto (el 0.25 nos sirve para ajustar la velocidad de scroll) desde el top
  document.body.scrollTop += jump;
  document.documentElement.scrollTop += jump;

  if (!element.lastJump || element.lastJump > Math.abs(jump)) { //Comprueba que no sea la primera vez y que el salto anterior sea mayor que el salto que voy a hacer ahora
    element.lastJump = Math.abs(jump);
    setTimeout(function() {
      scrollToElement(element);
    }, 40);
  } else {
    element.lastJump = null;
  }
}

/* Ahora va el codigo que hace que cambie el menu según nos desplazamos por el documento*/

var acumulativeOffset = function (element) {
    var top = 0;

    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
    } while (element) {

    }
    
    return top; 
}

var quienSoyOffset = acumulativeOffset(document.getElementById("quien-soy"));
var estudiosOffset = acumulativeOffset(document.getElementById("estudios"));
var experienciaOffset = acumulativeOffset(document.getElementById("experiencia"));
var sobreMiOffset = acumulativeOffset(document.getElementById("sobre-mi"));
var contactoOffset = acumulativeOffset(document.getElementById("contacto"));

window.addEventListener("scroll", changeMenuStyle);

function changeMenuStyle(event) {
  var pageOffset = window.pageYOffset;

  if (pageYOffset >= 0 && pageYOffset < quienSoyOffset){
    deleteActiveClass();
    document
      .querySelector("a[href='#']")
      .parentNode.classList.add("nav__item--active");
  } else if (pageYOffset >= quienSoyOffset && pageYOffset < estudiosOffset) {
    deleteActiveClass();
    document
      .querySelector("a[href$='quien-soy']")
      .parentNode.classList.add("nav__item--active");
  } else if (pageYOffset >= estudiosOffset && pageYOffset < experienciaOffset) {
    deleteActiveClass();
    document
      .querySelector("a[href$='estudios']")
      .parentNode.classList.add("nav__item--active");
  } else if (pageYOffset >= experienciaOffset && pageYOffset < sobreMiOffset) {
    deleteActiveClass();
    document
      .querySelector("a[href$='experiencia']")
      .parentNode.classList.add("nav__item--active");
  } else if (pageYOffset >= sobreMiOffset && pageYOffset < contactoOffset) {
    deleteActiveClass();
    document
      .querySelector("a[href$='sobre-mi']")
      .parentNode.classList.add("nav__item--active");
  } else if (pageYOffset >= contactoOffset) {
    deleteActiveClass();
    document
      .querySelector("a[href$='contacto']")
      .parentNode.classList.add("nav__item--active");
  }
}
