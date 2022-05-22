import React from 'react';
import { useContext, useRef } from 'react';
import NoteContext from "../../context/notes/noteContext";
import styles from './Notesitem.module.css';

const Notesitem = (props) => {
    const {note} = props;
    const context = useContext(NoteContext);
    const {deleteNote, editNote} = context;
    const editTitle = useRef(null);
    const editDesp = useRef(null);
    const delBtn = useRef(null);
    const editBtn = useRef(null);
    const editTag = useRef(null);
    const done = useRef(null);
    // const checkBtn = useRef(null);

    const updateNote = () => {
        editTitle.current.contentEditable = true;
        editTitle.current.focus();
        editDesp.current.contentEditable = true;
        editTag.current.contentEditable = true;
        delBtn.current.style.display = "none";
        editBtn.current.style.display = "none";
        done.current.style.display = "block";
    }

    const changeNote = () => {
        note.title = editTitle.current.innerHTML;
        note.description = editDesp.current.innerHTML;
        note.tag = editTag.current.innerHTML;
        console.log(note.title, note.description);
        editTitle.current.contentEditable = false;
        editDesp.current.contentEditable = false;
        editTag.current.contentEditable = false;
        delBtn.current.style.display = "inline";
        editBtn.current.style.display = "inline";
        done.current.style.display = "none";
        editNote(note._id, note.title, note.description, note.tag, note.color, note.check)
        props.showAlert("Successfully updated message", "success");
    }

    const checkNote = () => {
        if(note.color === "red") note.color = "rgb(15, 162, 15)";
        else note.color = "red";
        if(note.check === 'false') note.check = "true";
        else note.check = "false";
        editNote(note._id, note.title, note.description, note.tag, note.color, note.check);
    }
    
    return (
        <div className={`${note.tag === 'TODO' ? styles.todoBox : styles.box}`} style={{display:'block', backgroundColor : `${note.tag === 'TODO' ? note.color : 'white'}`}}>
            <div className={styles.name}>
                <span ref={editTitle} id = 'title' className={styles.titleName}>{note.title}</span>
                {note.tag === 'TODO' ? note.check === "true" ? <span style={{cursor:'pointer' }}  onClick={() => checkNote()}>&#x2611;</span> : <span style={{cursor:'pointer' }} onClick={() => checkNote()}>&#x2610;</span> : "" }
            </div>
            <hr/>
            {/* <h5 ref={editTitle} id = 'title' className="card-title">{note.title}</h5> */}
            <p ref={editDesp} className={styles.desc}>{note.description}</p>
            <code placeholder='Enter tag name' style={{display:'block', color : `${note.tag === 'TODO' ? 'white' : 'red'}`}} ref={editTag} id='tag' className="card-text">{note.tag}</code>
            <i ref={delBtn} className="fas fa-trash-alt mx-2" onClick={() => {deleteNote(note._id);
            props.showAlert("Note Deleted", "success")}}></i>
            <i ref={editBtn} className="far fa-edit" onClick={() => {updateNote();}}></i>
            <button onClick={() => changeNote()} ref={done} style={{display:'none' }} type="button" className="btn btn-dark">Done</button>
        </div>
    )
}

export default Notesitem
