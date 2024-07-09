import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  async function addNote(newNote) {
    try {
      const result = await fetch("http://localhost:5000/todos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newNote)
      });
      const data = await result.json();
      setNotes(prev=>{
        return [...prev,data];
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote(id) {
    try {
      await fetch(`http://localhost:5000/todos/${id}`,{
        method:"DELETE",
      })
      setNotes((prevNotes) => {
        return prevNotes.filter((noteItem) => {
          return noteItem.id !== id;
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getAll(){
    try {
      const result = await fetch("http://localhost:5000/todos")
      const data = await result.json();
      setNotes(data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    getAll();
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map(noteItem => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;