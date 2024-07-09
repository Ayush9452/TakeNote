import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function EditArea(props) {
    const [note, setNote] = useState({
        title: props.title,
        content: props.content,
        id: props.id
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    function submitNote(event) {
        event.preventDefault();
        props.onEdit(note);
    }

    return (
        <div>
            <form className="create-note edit-note" onSubmit={submitNote}>
                <Zoom in={true}>
                    <Fab className="cancelicon" onClick={props.closeEdit}>
                        <CancelIcon />
                    </Fab>
                </Zoom>
                <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows="3"
                />
                <Zoom in={true}>
                    <Fab type="submit">
                        <EditIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default EditArea;
