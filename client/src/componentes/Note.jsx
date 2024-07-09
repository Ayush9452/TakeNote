import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import EditArea from "./EditArea";

function Note(props) {
  const [note, setNote] = useState({
    title: props.title,
    content: props.content,
    id: props.id
  });

  function deleteItem() {
    props.onDelete(props.id);
  }

  function closeEdit(){
    setisEditing(false);
  }

  const [isEditing, setisEditing] = useState(false);
  async function editNote(newNote) {
    try {
      const { title, content, id } = newNote;
      const result = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          content: content
        })
      });
      const data = await result.json();
      setNote(data);
    } catch (err) {
      console.log(err);
    }
    closeEdit()
  }

  return (
    <div className="note">
      {isEditing ? <EditArea title={note.title} content={note.content} id={note.id} onEdit={editNote} closeEdit={closeEdit}/> : <><h1>{note.title}</h1>
        <p>{note.content}</p>
        <button className="deleteButton" onClick={deleteItem}>
          <DeleteIcon />
        </button>
        <button onClick={() => {
          setisEditing(true);
        }}>
          <EditIcon />
        </button></>}
    </div>
  );
}

export default Note;
