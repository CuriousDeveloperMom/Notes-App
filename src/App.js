import React, { Component } from 'react';
import "./App.css";
import {useEffect,useState} from 'react';
import uuid from "react-uuid";
//HashRouter
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './component/home';
import About from './component/about';
import Contact from './component/contact';
import NoteList from './component/NoteList';
import AddNote from './component/AddNote';

//class App extends Component {
  function App(){

    const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || []);
    const [activeNote, setActiveNote] = useState(false);

    useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    const onAddNote = () => {
      
      console.log("App.js - onAddNote");
      
      const newNote = {
        id: uuid(),
        title: "Untitled Note",
        body : "",
        lastModified: Date.now(),
      };

      setNotes([newNote, ...notes]);
      //setActiveNote(newNote.id);
    };

    const onDeleteNote = (idToDelete) => {

      setNotes(notes.filter((note) => note.id !== idToDelete));

    }

    const getActiveNote = () => {
      return notes.find((note) => note.id === activeNote);
      //return notes.find(({ id }) => id === activeNote);
    }

    const onEditNote = (updatedNote) => {

      //console.log("On Edit" + idToEdit);
      const updatedNotes = notes.map((note) => {

        //if (note.id === updatedNote.id) {
        if(note.id === activeNote){
            return updatedNote;
        }

        return note;

      })
      setNotes(updatedNotes);

    }


  //render(){
    return (
      <Router>
        <div className="App">
          <ul className="App-header">
            
            <li> <Link to = "/home">Home</Link> </li>
            <li> <Link to = "/about">About</Link> </li>
            <li> <Link to = "/contact">Contact</Link> </li>
            <li> <Link to = "/notelist">List Of Notes</Link> </li>
            <li> <Link to = "/addnote">Add Note Here</Link> </li>
          </ul>

          <Switch>
            <Route exact path='/home' component={Home}></Route>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/contact' component={Contact}></Route>

            {/* <Route exact path='/notelist' component={NoteList}></Route> */}

            <Route exact path='/notelist'>  
            <NoteList notes={notes} 
            onAddNote={onAddNote}
            onDeleteNote={onDeleteNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            />


            <AddNote notes={notes} 
              onAddNote={onAddNote}
              activeNote={getActiveNote()}
              onEditNote={onEditNote}
              />
            
            
            </Route>
            {/* <Route exact path='/addnote' component={AddNote}></Route> */}
            <Route exact path='/addnote'> 
              <AddNote notes={notes} 
              onAddNote={onAddNote}
              activeNote={getActiveNote()}
              onEditNote={onEditNote}
              />
            </Route>

          {/* Edit Note */}
            {/* <Route exact path='/editnote'> 
              <AddNote notes={notes} 
              //onAddNote={onAddNote}
              onEditNote={onEditNote}
              activeNote={getActiveNote()}
               />
            </Route> */}


          </Switch>
        </div> 
      </Router>
    )
  }
//}

export default App;
