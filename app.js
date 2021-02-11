let formulario = document.getElementById("form");
let btn = document.getElementById("btn");
let contenedor = document.getElementById("contenedor");
let total = document.getElementById("total_task");

const DataLocalStore=JSON.parse(localStorage.getItem('task'))
console.log(DataLocalStore)
/*** Formulario :S****/
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  AgregarDatos();
  formulario.reset();
});

/*****Agregando Datos :S******/
const AgregarDatos = () => {
  let box = document.getElementById("caja").value;
  let NewTask = { task: box};
  let data = [];
  if (localStorage.getItem("task") === null) {
    data.push(NewTask);
    localStorage.setItem("task", JSON.stringify(data));
  } else {
    let dataArray = JSON.parse(localStorage.getItem("task"));
    console.log(dataArray);
    dataArray.push(NewTask);
    localStorage.setItem("task", JSON.stringify(dataArray));
  }
  MostrarDatos();
};

/****Mostrando Datos :S****/
const MostrarDatos = () => {
  contenedor.innerHTML = "";

  let task = JSON.parse(localStorage.getItem("task"));

  if (JSON.parse(localStorage.getItem("task") === null)) {
    alert("no hay datos para mostrar");
  } else {
    for (let index = 0; index < task.length; index++) {
      let title = task[index].task;
     
      contenedor.innerHTML += `
          <div class="element_task">
              <p>${title}</p>
              <span class="delete" onclick="eliminar('${title}')"><i class="fas fa-trash-alt"></i></span>
          </div>
          `;
      TotalDatos(task);
    }
  }
};
MostrarDatos();

/****Eliminando Datos :S */
contenedor.addEventListener("click", (e) => {});

function eliminar(title) {
  let newdata = JSON.parse(localStorage.getItem("task"));
  for (let value = 0; value< newdata.length; value++) {
    if (newdata[value].task === title) {
      newdata.splice(value, 1);
    }
    localStorage.setItem("task", JSON.stringify(newdata));
  }
  MostrarDatos();
  TotalDatos(newdata);
}

function TotalDatos(value) {
  total.textContent = "Total : " + value.length;
}

let filter = document.querySelector(".filter");

filter.addEventListener("keyup", (e) => {
  contenedor.innerHTML = "";
  let data = e.target.value;
  let info = JSON.parse(localStorage.getItem("task"));
  info.forEach((element) => {
    let value = element.task.includes(data);
    if (value) {
      contenedor.innerHTML += `
      <div class="element_task">
      <p>${element.task}</p>
      <span class="delete" onclick="eliminar('${element.task}')"><i class="fas fa-trash-alt"></i></span>
      </div>
      `;
    }
  });
});


