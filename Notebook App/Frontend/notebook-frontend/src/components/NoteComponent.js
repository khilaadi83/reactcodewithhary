import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';

const NoteComponent = () => {
    const context = useContext(noteContext);
    const { notes, setNotes } = context;
    
    return (
        <div className="container">
            <div className="row">
                {notes && notes.map(note => (
                    <div className="col-md-4" key={note._id}>
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.description}</p>
                                <Link to={`/notes/${note._id}`} className="btn btn-warning">View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NoteComponent;
