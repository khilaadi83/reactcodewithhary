import React from 'react';
import NoteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props) => {

  let notesInitial = [
    {
      "_id": "6687e9c18829aa6b4ae9e711",
      "user": "6684b0d0995f2a1286a56952",
      "title": "First Note",
      "description": "Hello How are you",
      "createdAt": "2024-07-05T12:40:33.970Z",
      "updatedAt": "2024-07-05T12:40:33.970Z",
      "__v": 0
    },
    {
      "_id": "668baf138708e7dd7f233dcc",
      "user": "6684b0d0995f2a1286a56952",
      "title": "sixth note",
      "description": "Hello How are you has been now updated",
      "createdAt": "2024-07-08T09:19:15.910Z",
      "updatedAt": "2024-07-08T09:19:15.910Z",
      "__v": 0
    },
    {
      "_id": "668baf138708e7dd7f233dcd",
      "user": "6684b0d0995f2a1286a56952",
      "title": "sixth note",
      "description": "Hello How are you has been now updated",
      "createdAt": "2024-07-08T09:19:15.910Z",
      "updatedAt": "2024-07-08T09:19:15.910Z",
      "__v": 0
    },
    {
      "_id": "668baf138708e7dd7f233dce",
      "user": "6684b0d0995f2a1286a56952",
      "title": "sixth note",
      "description": "Hello How are you has been now updated",
      "createdAt": "2024-07-08T09:19:15.910Z",
      "updatedAt": "2024-07-08T09:19:15.910Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial);
  // Get all notes

  const getNotes = async () => {
    const response = await fetch(`http://localhost:3000/api/notes/fetchallNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }

 // Add a note
  const addNote = async (title, description) => {
    console.log('adding a new Note', title, description)
    try {
      // API Call
      const response = await fetch(`http://localhost:3000/api/notes/addNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description })
      });
      console.log(JSON.stringify({ title, description }))

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Note added successfully:', json);

      // Update the notes state with the new note
      setNotes([...notes, json]);

    } catch (error) {
      console.error('Error adding note:', error);
    }
  }

  // Delete a note 
  const deleteNote = async (id) => {
    alert(id)
    if (window.confirm('Are you sure you want to delete this note?', id)) {
      console.log('Deleting the note with id' + id)
      setNotes(notes.filter((note) => {
        return note._id !== id
      }))
    
      //APi Call
      const response = await fetch(`http://localhost:3000/api/notes/deleteNote/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token')
        }
      });
      const json = await response.json()
      console.log(json)
    }
  }

  // Edit a note
  const editNote = async (id, title, description) => {
    //APi Call
    const response = await fetch(`http://localhost:3000/api/notes/updateNotes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description })
    });
    const json = await response.json()
  }
  return (

    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}
export default NoteState;