import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Modal from './Modal';

const NoteComponent = () => {
  const context = useContext(noteContext);
  const { notes, deleteNote, editNote, getNotes } = context;
  const [selectedNote, setSelectedNote] = useState(null);  
  
  // Fetch notes when the component mounts
  useEffect(() => {
    getNotes();
  }, []);

  // Handle click to edit the note
  const handleEditClick = (note) => {
    setSelectedNote(note);

    // Open the modal (using Bootstrap)
    const modalElement = document.getElementById('exampleModal');
    const modal = new window.bootstrap.Modal(modalElement);
    modal.show();
  };

  return (
    <div className="container">
      {/* Pass selectedNote, editNote, and getNotes to the Modal */}
      <Modal selectedNote={selectedNote} editNote={editNote} getNotes={getNotes} />
      <div className="row">
        {notes && notes.map(note => (
          <div className="col-md-4" key={note._id}>
            <div className="card my-3">
              <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-regular fa-pen-to-square" 
                   style={{ color: '#4CAF50' }}  
                   onClick={() => handleEditClick(note)}>
                </i> 
                <i className="fa-solid fa-trash" 
                   style={{ color: '#F44336' }} 
                   onClick={() => deleteNote(note._id)}>
                </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteComponent;
