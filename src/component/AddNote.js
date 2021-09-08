import uuid from "react-uuid";
import ReactMarkdown from "react-markdown";

function AddNote({notes, activeNote, onEditNote}){

    console.log("Notes : " + notes.length);
    console.log(activeNote);

    const onAddNote = () => {
      
      console.log("onAddNote onAddNote");
      
      let title = document.getElementById("title").value;
      let body = document.getElementById("body").value;
      const newNote = {
        id: uuid(),
        title: title,
        body : body,
        lastModified: Date.now(),
      };

      notes.push(newNote);
    }

    const onEditField = (key, value) => {
        onEditNote({
            ...activeNote,
            [key]: value,
            lastModified: Date.now(),

        })
    };

    if(!activeNote) return <div className="no-active-note">No note selected</div>

    return (
    <div className="app-main">
        <div className="app-main-note-edit">
            <button onClick={onAddNote}>Add</button>
            <input type="text" id="title" value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)} autoFocus />
            <textarea id="body" placeholder="Write your note here....."
            value={activeNote.body}
            onChange={(e) => onEditField("body", e.target.value)} />
        </div>
        <div className="app-main-note-preview">
             <h1 className="preview-title">{activeNote.title}</h1>
            <ReactMarkdown className="markdown-preview">{activeNote.body}</ReactMarkdown>
        </div>
    </div>
    )
}
export default AddNote;