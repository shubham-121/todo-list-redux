import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  editNote,
  deleteNote,
  toggleNoteClick,
  updateNoteStatus,
  toggleEditModal,
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
            id={note.id}
            index={idx + 1}
            taskname={note.taskname}
            noteStatus={note.status}
            edit={note.edit}
            remove={note.remove}
          />
        ))}
      </ol>
    </div>
  );
}

function RenderToDo({ index, id, taskname, noteStatus, edit, remove }) {
  const dispatch = useDispatch();

  const { isEdit } = useSelector((store) => store.features);

  function handleStatus(e) {
    const newStatus = e.target.value;
    dispatch(updateNoteStatus({ id, newStatus })); // Dispatch the new status to Redux
  }

  function handleEditNote() {
    dispatch(toggleEditModal(isEdit));
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
      <button onClick={handleEditNote}>{edit}</button>
      <button>{remove}</button>

      <div>{isEdit && <EditNote id={id}></EditNote>}</div>
    </div>
  );
}

function EditNote({ id }) {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const { isEdit } = useSelector((store) => store.features);

  function handleEditNote() {
    dispatch(toggleEditModal(isEdit));
  }

  function handleQuery(e) {
    //update the note
    setQuery(e.target.value);
  }

  function handleSubmit() {
    dispatch(editNote({ id, query }));
    dispatch(toggleEditModal(isEdit));
  }

  return (
    <div className="edit-note">
      <button id="edit-closebtn" onClick={handleEditNote}>
        X
      </button>
      <p> Edit your note here!</p>
      <div className="edit-modal">
        <input
          value={query}
          onChange={handleQuery}
          className="input-txt"
          type="text"
          placeholder="New message here"
        ></input>
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
}
