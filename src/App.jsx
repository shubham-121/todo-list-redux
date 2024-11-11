import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  toggleCreateNote,
  editNote,
  deleteNote,
  toggleEditModal,
  updateNotification,
  clearUpdateNotification,
} from "./features";

import {
  toggleDark,
  sortNotes,
  sortAlphabetically,
  sortCompleted,
  sortNewest,
  sortOldest,
} from "./uiFeatures";

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

// <div  className={`render-todo ${status === "complete" ? "line-through" : ""}`}
// >

export default function App() {
  const dispatch = useDispatch();
  const { isDark } = useSelector((store) => store.UI);

  return (
    <div className={`app ${isDark ? "toggleDark" : ""}`}>
      <Header></Header>
      <DisplayToDoList></DisplayToDoList>
    </div>
  );
}

function Header() {
  const dispatch = useDispatch();
  const { createNoteClick, notesArray, id } = useSelector(
    (store) => store.features
  );
  const { isDark } = useSelector((store) => store.UI);

  const [newNote, setNewNote] = useState("");
  const [sortType, setSortType] = useState("");

  function handleNote() {
    dispatch(toggleCreateNote());
  }

  function handleDarkMode() {
    dispatch(toggleDark());
  }

  //sort logic
  function handleSort(e) {
    setSortType(e.target.value);
    const sort = e.target.value;

    if (sort === "sortAlphabetically") dispatch(sortAlphabetically(notesArray));
    // else if (sort === "sortCompleted") dispatch(sortCompleted(notesArray));
    else if (sort === "sortNewest") dispatch(sortNewest(notesArray));
    else if (sort === "sortOldest") dispatch(sortOldest(notesArray));
  }

  return (
    <>
      <button onClick={handleNote} className="new-note">
        Create New
      </button>

      <button
        onClick={handleDarkMode}
        className={`dark-mode ${isDark ? "dark-mode-btn" : ""}`}
      ></button>

      {/* prettier-ignore */}
      <select defaultValue="sort" className="sort-btn" onChange={handleSort}>
        <option value="sort" disabled> Sort </option>
        <option value="sortAlphabetically">Alphabetically</option>
        {/* <option value="sortCompleted">Completed </option> */}
        <option value="sortNewest">Newest </option>
        <option value="sortOldest">Oldest </option>
      </select>

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
  const { sortedNotes } = useSelector((store) => store.UI);
  console.log("Sorted data", sortedNotes);
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

        {sortedNotes.length > 0
          ? sortedNotes.map((note, idx) => (
              <RenderToDo
                key={idx}
                index={idx}
                id={note.id}
                taskName={note.taskName}
                noteStatus={note.status}
                edit={note.edit}
                remove={note.remove}
              ></RenderToDo>
            ))
          : notesArray.map((note, idx) => (
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
  const [status, setStatus] = useState("pending");
  const [checkbox, setCheckbox] = useState(false);
  // const [isEditClicked, setIsEditClicked] = useState(false);
  // const [isEdit, setIsEdit] = useState("");

  const dispatch = useDispatch();
  const { isEditClicked, updateNotif, editId } = useSelector(
    (store) => store.features
  );

  useEffect(() => {
    if (noteStatus) setStatus(noteStatus);
  }, [noteStatus]);

  console.log(noteStatus, status);

  function handleStatus(e) {
    console.log(e.target.value);
    setStatus(e.target.value);
  }

  function handleEditClicked(prev) {
    dispatch(toggleEditModal(id));
  }

  function handleCheckbox(e) {
    console.log("Checkbox clicked", !checkbox);
    setCheckbox(!checkbox);
  }

  function handleDelete() {
    dispatch(deleteNote(id));
  }

  return (
    <div
      className={`render-todo ${status === "complete" ? "line-through" : ""}`}
    >
      {/* <div  className="render-todo"> */}
      <input type="checkbox" value={checkbox} onChange={handleCheckbox}></input>
      <p>{index + 1}</p>
      {/* correct hai delte below one */}
      <p>{taskName}</p>
      {/* <p>Buy a car</p> */}
      <select id="status" value={status} onChange={handleStatus}>
        <option value={"pending"}>Pending</option>
        <option value={"complete"}>Completed</option>
        <option value={"later"}>Later</option>
      </select>
      <button value={isEditClicked} onClick={handleEditClicked}>
        {edit}
      </button>
      <button onClick={handleDelete}>{remove}</button>
      {/* {isEditClicked && <EditModal uniqueId={id}></EditModal>} */}
      {editId === id && <EditModal uniqueId={id}></EditModal>}

      {/* {updateNotif && <UpdateNotification></UpdateNotification>} */}
    </div>
  );
}

function EditModal({ uniqueId }) {
  const dispatch = useDispatch();
  const { notesArray, id, updateNotif } = useSelector(
    (store) => store.features
  );
  console.log(notesArray, id);

  const [editNotetext, setEditNoteText] = useState("");
  const [editStatus, setEditStatus] = useState("");

  function handleEditClicked(prev) {
    dispatch(toggleEditModal());
  }

  function handleEditNote(e) {
    setEditNoteText(e.target.value);
  }

  function handleEditStatus(e) {
    setEditStatus(e.target.value);
  }

  function handleEditSubmit() {
    console.log(editNotetext, editStatus, uniqueId);
    dispatch(editNote(editNotetext, editStatus, uniqueId));
    dispatch(toggleEditModal());
    dispatch(updateNotification());
  }

  return (
    <div className="edit-modal">
      <button className="edit-closebtn " onClick={handleEditClicked}>
        X
      </button>
      <div className="edit-modal-2">
        <input
          value={editNotetext}
          onChange={handleEditNote}
          className="input-txt"
          type="text"
          placeholder="Enter new text"
        ></input>
        <select value={editStatus} onChange={handleEditStatus}>
          <option>Pending</option>
          <option>Finished</option>
          <option>Later</option>
        </select>
      </div>
      <button id="submit-btn-editnote" onClick={handleEditSubmit}>
        Submit
      </button>
      {updateNotif && <UpdateNotification></UpdateNotification>}
    </div>
  );
}

function UpdateNotification() {
  const dispatch = useDispatch();
  const { notesArray, id, updateNotif } = useSelector(
    (store) => store.features
  );

  useEffect(() => {
    if (updateNotif) {
      const timer = setTimeout(() => {
        console.log("timer");
        dispatch(clearUpdateNotification());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [updateNotif, dispatch]);

  return (
    <div className="update-notif">
      <p>Note Updated!</p>
    </div>
  );
}

//continue with adding the update note functionality to the app

function DarkMode() {
  return (
    <div>
      <p>Dark mode</p>
    </div>
  );
}
