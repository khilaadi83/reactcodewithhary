import React, { useState, useEffect } from 'react';

const Modal = ({ selectedNote, editNote, getNotes }) => {
  const [note, setNote] = useState({ title: '', description: '' });

  // Update note state when a new selectedNote is passed
  useEffect(() => {
    if (selectedNote) {
      setNote({
        title: selectedNote.title,
        description: selectedNote.description
      });
    }
  }, [selectedNote]);

  // Handle input changes
  const onChange = (e) => {
    setNote({ ...note, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call editNote and pass the updated note details
    await editNote(selectedNote._id, note.title, note.description);

    // Re-fetch the notes after updating
    getNotes();

    // Manually hide the modal (using vanilla JavaScript)
    const modalElement = document.getElementById('exampleModal');
    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove('modal-open');
    document.body.style = '';
  };

  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    value={note.title} 
                    onChange={onChange} 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="description" 
                    value={note.description} 
                    onChange={onChange} 
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Note</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
