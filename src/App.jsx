import "./App.css";

const todo_tasks = [
  {
    key: 1,
    taskname: "Eat breakfast",
    status: "pending",
    edit: "✏️",
    remove: "🗑️",
  },
  {
    key: 2,
    taskname: "Book flight tickets today",
    status: "complete",
    edit: "✏️",
    remove: "🗑️",
  },
  {
    key: 3,
    taskname: "Get the medications",
    status: "pending",
    edit: "✏️",
    remove: "🗑️",
  },
  {
    key: 4,
    taskname: "Join the gym today",
    status: "pending",
    edit: "✏️",
    remove: "🗑️",
  },
];

export default function App() {
  return (
    <div className="app">
      <Header></Header>
      <DisplayToDoList></DisplayToDoList>
    </div>
  );
}

function Header() {
  return (
    <>
      {" "}
      <button className="new-note">Create New</button>
      {/* <button className="new-note">Create New</button> */}
      <div className="header">
        <p>ToDo List App</p>
      </div>
    </>
  );
}

function DisplayToDoList() {
  return (
    <div className="todo-container">
      <div className="todo-heading">
        <p className="headers">Task No</p> <hr className="line"></hr>
        <p className="headers">Task Name</p> <hr className="line"></hr>
        <p className="headers">Status</p> <hr className="line"></hr>
        <p className="headers">Edit</p> <hr className="line"></hr>
        <p className="headers">Remove</p> <hr className="line"></hr>
      </div>
      <ol>
        {todo_tasks.map((task, idx) => (
          <RenderToDo
            key={task.key}
            id={task.key}
            taskname={task.taskname}
            status={task.status}
            edit={task.edit}
            remove={task.remove}
          ></RenderToDo>
        ))}
      </ol>
    </div>
  );
}

function RenderToDo({ id, taskname, status, edit, remove }) {
  return (
    <div className="render-todo">
      <input type="checkbox"></input>
      <p>{id}</p>
      <p>{taskname}</p>
      <button id="status">{status}</button>
      <button>{edit}</button>

      <button>{remove}</button>
    </div>
  );
}
