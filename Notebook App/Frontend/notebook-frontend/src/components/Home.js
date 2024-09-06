import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteComponent from './NoteComponent';
const Home = () => {
  const context = useContext(noteContext);
  const {addNote} = context;
const [note, setNote] = useState({ title: "", description: "" })

  const handleClick = (e) => {
    e.preventDefault()
   addNote(note.title, note.description)
  }
  const onChange = (e) => {
   setNote ({ ...note, [e.target.id]: e.target.value })
  }
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h1 className="lead">Add Note</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="Title" className="form-label">Title</label>
                <input type="text" className="form-control" name='title' id="title" onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" name='description' id="description" onChange={onChange}/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
          </div>
          <div className='col-md-6'>
            <img src="Notebook App\Frontend\notebook-frontend\static\images\Gemini_Generated_Image_6dnet26dnet26dne.jpeg" alt="" />
          </div>
        </div>
      </div>
      <div className="container my-3">
        <h1 className="lead">Your Notes</h1>
      
          <NoteComponent />
        
      </div>
    </>
  )
}

export default Home
