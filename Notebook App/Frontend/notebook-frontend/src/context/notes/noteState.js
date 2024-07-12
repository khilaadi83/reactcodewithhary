import React from 'react';
import NoteContext from './noteContext';
import { useState } from 'react';
const NoteState = (props) => {
    
    let notesInitial  = [
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
            "_id": "668baf138708e7dd7f233dcc",
            "user": "6684b0d0995f2a1286a56952",
            "title": "sixth note",
            "description": "Hello How are you has been now updated",
            "createdAt": "2024-07-08T09:19:15.910Z",
            "updatedAt": "2024-07-08T09:19:15.910Z",
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
          }
      ]
      const [notes, setNotes] = useState(notesInitial);
    return (

        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;