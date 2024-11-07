import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { createNote } from "./features";

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
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState("");
  const [noteClick, setNoteClick] = useState(false);

  function handleNote() {
    setNoteClick(!noteClick);
  }

  return (
    <>
      <button onClick={handleNote} className="new-note">
        Create New
      </button>

      {noteClick && (
        <>
          <button onClick={handleNote} className="close-btn">
            X
          </button>
          <CreateNote />
        </>
      )}

      <div className="header">
        <p>ToDo List App</p>
      </div>
    </>
  );
}

function CreateNote() {
  const [noteText, setNoteText] = useState("");
  const [submit, setSubmit] = useState(false);

  function handleCreateNote(e) {
    setNoteText(e.target.value);
  }

  function handleSubmitNote() {}

  return (
    <div className="create-note">
      <input
        className="input-txt"
        value={noteText}
        onChange={handleCreateNote}
        type="text"
        placeholder="Enter the note"
      ></input>
      <span>Status</span>
      <select className="select">
        <option>Completed</option>
        <option>Pending</option>
        <option>Later</option>
      </select>
      <button onClick={handleSubmitNote} className="btn">
        Create
      </button>
    </div>
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

function RenderToDo({ id, taskname, edit, remove }) {
  const [status, setStatus] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isEdit, setIsEdit] = useState("");

  function handleStatus(e) {
    console.log(e.target.value);
    setStatus(e.target.value);
  }

  function handleEditClicked(prev) {}

  return (
    <div className="render-todo">
      <input type="checkbox"></input>
      <p>{id}</p>
      <p>{taskname}</p>

      <select id="status" value={status} onChange={handleStatus}>
        <option value={"pending"}>Pending</option>
        <option value={"complete"}>Completed</option>
        <option value={"later"}>Later</option>
      </select>
      <button value={isEditClicked} onChange={handleEditClicked}>
        {edit}
      </button>

      <button>{remove}</button>
    </div>
  );
}
