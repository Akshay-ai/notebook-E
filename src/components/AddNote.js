import React from 'react';
import { useContext, useState } from 'react';
import NoteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description : "", tag : ""})

    const handleClick = (e) => {
        addNote(note.title, note.description, note.tag);
        e.preventDefault();
        props.showAlert("New Note Added", "success")
        setNote({title : "", description : "", tag : ""})
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>Add Notes</h1>
            <form className="my-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                Title
                </label>
                <input
                type="text"
                value={note.title}
                className="form-control"
                id="title"
                name='title'
                onChange={onChange}
                minLength={5}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                Description
                </label>
                <input
                type="text"
                value={note.description}
                className="form-control"
                id="description"
                name='description'
                onChange={onChange}
                minLength={5}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                tag
                </label>
                <input
                type="text"
                value={note.tag}
                className="form-control"
                id="tag"
                name='tag'
                onChange={onChange}
                minLength={3}
                />
            </div>
            <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>
                Add Note
            </button>
            </form>
        </div>
    )
}

export default AddNote
