import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
        });
        let json = await response.json();
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title, description, tag})
        });
        let note = await response.json();
        setNotes(notes.concat(note));
    }

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log("JSON from NoteState: ", json);
        const newNote = notes.filter((note) => {return note._id !== id});
        setNotes(newNote);
    }

    const editNote = async (id, title, description, tag, color, check) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body : JSON.stringify({title, description, tag, color, check})
        });
        const json = await response.json();
        console.log("JSON from NoteState: ", json);
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id) {
                newNotes[index].title = title;
                newNotes[index].tag = tag;
                newNotes[index].description = description;
                if(tag === 'TODO') {
                    newNotes[index].color = color;
                    newNotes[index].check = check;
                }
                break;
            }
        }
        setNotes(newNotes)
    }

    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState