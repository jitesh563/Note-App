import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';

const NotePage = () => {
    let { id: noteId } = useParams(); // Destructure and rename 'id' from useParams to 'noteId'
    let [note, setNote] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        getNote();
    }, [noteId]);

    let getNote = async () => {
        if (noteId === 'new') return;

        let response = await fetch(`/api/notes/${noteId}/`);
        let data = await response.json();
        setNote(data);
    };

    let createNote = async () => {
        await fetch(`/api/notes/create/`, { // Corrected the URL for note creation
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    };

    let updateNote = async () => {
        await fetch(`/api/notes/${noteId}/update/`, { // Corrected the URL for note update
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
    };

    let deleteNote = async () => {
        await fetch(`/api/notes/${noteId}/delete/`, { // Corrected the URL for note deletion
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate('/'); // Use navigate instead of history.push
    };

    let handleSubmit = () => {
      if (!note || note.body === '') {
        if (noteId !== 'new') {
          deleteNote();
        }
      } else if (noteId !== 'new') {
        updateNote();
      } else {
        createNote();
      }
  
      navigate('/');
    };

    
    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value }));
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => handleChange(e.target.value)} value={note?.body}></textarea>
        </div>
    );
};

export default NotePage;
