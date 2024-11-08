import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  editNote,
  deleteNote,
  toggleNoteClick,
  updateNoteStatus,
} from "./features";

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

  const noteClick = useSelector((store) => store.features.noteClick);

  const [newNote, setNewNote] = useState("");
  // const [noteClick, setNoteClick] = useState(false);

  function handleNoteClick() {
    dispatch(toggleNoteClick());
  }

  return (
    <>
      <button onClick={handleNoteClick} className="new-note">
        Create New
      </button>

      {noteClick && (
        <>
          <button onClick={handleNoteClick} className="close-btn">
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
  const dispatch = useDispatch();

  const [noteText, setNoteText] = useState("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState("");

  function handleCreateNote(e) {
    setNoteText(e.target.value);
  }
  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handleSubmitNote() {
    dispatch(createNote({ noteText, status }));
    dispatch(toggleNoteClick());
  }

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
      <select value={status} className="select" onChange={handleStatus}>
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
  const notesArray = useSelector((store) => store.features.notesArray);
  if (notesArray.length > 0) console.log(notesArray);

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
        {/* {todo_tasks.map((task, idx) => (
          <RenderToDo
            key={task.key}
            id={task.key}
            taskname={task.taskname}
            status={task.status}
            edit={task.edit}
            remove={task.remove}
          ></RenderToDo>
        ))} */}
        {notesArray.map((note, idx) => (
          <RenderToDo
            key={note.id}
            // id={note.id}
            id={idx + 1}
            taskname={note.taskname.noteText}
            noteStatus={note.taskname.status}
            edit={note.edit}
            remove={note.remove}
          />
        ))}
      </ol>
    </div>
  );
}

function RenderToDo({ id, taskname, noteStatus, edit, remove }) {
  const dispatch = useDispatch();

  function handleStatus(e) {
    const newStatus = e.target.value;
    dispatch(updateNoteStatus({ id, newStatus })); // Dispatch the new status to Redux
  }

  return (
    <div className="render-todo">
      <input type="checkbox"></input>
      <p>{id}</p>
      <p>{taskname}</p>

      <select id="status" value={noteStatus} onChange={handleStatus}>
        <option value="pending">Pending</option>
        <option value="complete">Completed</option>
        <option value="later">Later</option>
      </select>
      <button>{edit}</button>
      <button>{remove}</button>
    </div>
  );
}
