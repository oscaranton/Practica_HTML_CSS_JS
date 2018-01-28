var originHistory = document.getElementById("contact-history-list");

function getData() {
  makeRequest("GET", "http://localhost:8000/api/task", null, function(data) {
    var response = JSON.parse(data);
    var ul = document.createElement("ul");
    var children = "";
    response.forEach(element => {
      children += "<li>" + element.name + "</li>";
    });
    ul.innerHTML = children;
    ul.style.listStyleType = "none";
    originHistory.appendChild(ul);
  });
}

function createData() {
  var data = {
    name: document.getElementById("nombre").value + document.getElementById("apellido").value
  };
  makeRequest("POST", "http://localhost:8000/api/task", data, function() {
    console.log("Datos creados correctamente.");
  });
}

function makeRequest(method, url, body, callbackSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        console.log("Petición OK");
        callbackSuccess(xhr.responseText);
      }
    };
    if (body) {
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  }

getData();

//createData();
