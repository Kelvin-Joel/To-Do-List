const title_task = document.getElementById("title_task");
const conte_list__task = document.getElementById("conte_list__task");
let ArrayTask = localStorage.getItem('task') === null ? [] : JSON.parse(localStorage.getItem('task'))
let idTask = ''

document.addEventListener("click", (e) => {
  e.preventDefault();
  AddTask(e);
  DeleteTask(e);
  EdiTask(e);
});

const SaveTask = () => {
  localStorage.setItem('task', JSON.stringify(ArrayTask))
}

const AddTask = (e) => {
  if (e.target.classList.contains("register_task")) {

    const task = { id: Date.now(), title: title_task.value, };

    if (title_task.value !== '') {
      ArrayTask = [...ArrayTask, task]
      SaveTask();
      title_task.value = "";
      ListTask();
      swal(
        'Se Registro Correctamente!',
        '',
        'success'
      )
      return;
    }
    swal(
      'Error Campos Vacios!',
      '',
      'error'
    )
  }
};

let state = true;

const ListTask = () => {
  conte_list__task.innerHTML = "";
  if (JSON.parse(localStorage.getItem('task'))) {
    JSON.parse(localStorage.getItem('task')).map(
      (item) =>
      (conte_list__task.innerHTML += `
      <div class="tasks flex">
        <span class="">${item.title}</span>
        <div class="conte_buttons">
        <span class="edit fas fa-edit" data-id=${item.id}></span>
        <span class="fas fa-trash-alt delete " data-id=${item.id}></span>
        </div>
      </div>
      `)
    )
  } else {
    console.log('no hay datos para mostrar pe :S')
  }
};

ListTask();

const DeleteTask = (e) => {
  let idTask = e.target.dataset.id
  if (e.target.classList.contains("delete")) {
    const newTask = ArrayTask.filter(task => task.id !== Number(idTask))
    ArrayTask = newTask
    SaveTask();
    ListTask();
    swal(
      'Se Elimino Correctamente!',
      '',
      'success'
    )
    return;
  }
};

const EdiTask = (e) => {
  let idTask = e.target.dataset.id
  if (e.target.classList.contains("edit")) {
    if (title_task.value !== '') {
      const newTask = { id: Date.now(), title: title_task.value, };
      const ediTask = ArrayTask.map(task => task.id === Number(idTask) ? newTask : task)
      ArrayTask = ediTask
      SaveTask();
      ListTask();
      title_task.value = ''
      swal(
        'Editado Correctamente!',
        '',
        'success'
      )
      return;
    }
    swal(
      'Error Campos Vacio!',
      '',
      'error'
    )
  }
}


