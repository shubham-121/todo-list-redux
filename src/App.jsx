import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  toggleCreateNote,
  editNote,
  deleteNote,
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
  // {
  //   key: 2,
  //   taskname: "Book flight tickets today",
  //   status: "complete",
  //   edit: "✏️",
  //   remove: "🗑️",
  // },
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
  const { createNoteClick } = useSelector((store) => store.features);

  const [newNote, setNewNote] = useState("");

  function handleNote() {
    dispatch(toggleCreateNote());
  }

  return (
    <>
      <button onClick={handleNote} className="new-note">
        Create New
      </button>

      {createNoteClick && (
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
  const dispatch = useDispatch();
  const { createNoteClick } = useSelector((store) => store.features);

  const [noteText, setNoteText] = useState("");
  const [noteStatus, setNoteStatus] = useState("");

  function handleCreateNote(e) {
    setNoteText(e.target.value);
  }

  function handleNoteStatus(e) {
    setNoteStatus(e.target.value);
    console.log(e.target.value);
  }

  function handleSubmitNote() {
    console.log("data sent:", noteText, noteStatus);
    dispatch(createNote(noteText, noteStatus));
    dispatch(toggleCreateNote());
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
      <select value={noteStatus} onChange={handleNoteStatus} className="select">
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
  const dispatch = useDispatch();
  const { notesArray } = useSelector((store) => store.features);
  console.log(notesArray);

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
        {/* correct code below */}
        {/* {notesArray.map((note, idx) => (
          <RenderToDo
            key={idx}
            index={idx}
            id={note.id}
            taskName={note.taskName}
            noteStatus={note.status}
            edit={note.edit}
            remove={note.remove}
          ></RenderToDo>
        ))} */}

        {/* for testing purpose only */}
        {todo_tasks.map((note, idx) => (
          <RenderToDo
            key={idx}
            index={idx}
            id={note.id}
            taskName={note.taskName}
            noteStatus={note.status}
            edit={note.edit}
            remove={note.remove}
          ></RenderToDo>
        ))}
      </ol>
    </div>
  );
}

function RenderToDo({ index, id, taskName, noteStatus, edit, remove }) {
  const [status, setStatus] = useState("");
  // const [isEditClicked, setIsEditClicked] = useState(false);
  // const [isEdit, setIsEdit] = useState("");

  const dispatch = useDispatch();
  const { isEditClicked } = useSelector((store) => store.features);

  useEffect(() => {
    setStatus(noteStatus);
  }, [noteStatus]);

  function handleStatus(e) {
    console.log(e.target.value);
    setStatus(e.target.value);
  }

  function handleEditClicked(prev) {
    dispatch(toggleEditModal());
  }

  return (
    <div className="render-todo">
      <input type="checkbox"></input>
      <p>{index + 1}</p>
      {/* <p>{taskName}</p>        correct hai delte below one */}
      <p>Buy a car</p>

      <select id="status" value={status} onChange={handleStatus}>
        <option value={"pending"}>Pending</option>
        <option value={"complete"}>Completed</option>
        <option value={"later"}>Later</option>
      </select>
      <button value={isEditClicked} onClick={handleEditClicked}>
        {edit}
      </button>

      <button>{remove}</button>

      {isEditClicked && <EditModal></EditModal>}
    </div>
  );
}

function EditModal() {
  console.log("modal opened");
  return (
    <div className="edit-modal">
      <button className="edit-closebtn ">X</button>
      <div className="edit-modal-2">
        <input
          className="input-txt"
          type="text"
          placeholder="Enter new text"
        ></input>
        <select>
          <option>Pending</option>
          <option>Finished</option>
          <option>Later</option>
        </select>
      </div>
      <button id="submit-btn-editnote">Submit</button>
    </div>
  );
}
