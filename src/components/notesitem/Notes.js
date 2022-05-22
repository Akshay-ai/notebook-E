import React, { useContext, useEffect } from 'react';
import NoteContext from "../../context/notes/noteContext";
import AddNote from '../AddNote';
import Notesitem from './Notesitem';
import { useNavigate } from 'react-router-dom';
import styles from './Notesitem.module.css';

const Notes = (props) => {
    const context = useContext(NoteContext);
    const {notes, getNotes} = context;
    let history = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes();
        }
        else {
            history('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <AddNote showAlert = {props.showAlert}/>
            <h1>Your Notes</h1>
            <div className={styles.conta}>
                <div>
                    {notes.length === 0 && <div>No notes to display</div>}
                </div>
                {notes.map((note) => {
                    return <Notesitem showAlert = {props.showAlert} key={note._id} note={note}/>
                })}
            </div>
        </>
    )
}

export default Notes
