import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import NoteComponent from './NoteComponent';
const Home = () => {

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <h1 className="lead">Add Note</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
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
