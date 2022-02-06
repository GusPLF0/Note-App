const fs = require("fs");
const addNote = (title, body) => {

    const notes = loadNotes()
    
    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
    }else{
        console.log('Note title taken!')
    }

}

const listNotes = ()=>{
    console.log("Your notes: ");
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title);
    });

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    
    let newNotes = notes.filter((note)=>{
        if(note.title !== title){
            return note
        }
    })
    
    saveNotes(newNotes);
}

const readNote = (title)=>{
    const notes = loadNotes();

    let gotIt = notes.find((note)=>note.title === title);
    if(gotIt){
        console.log(gotIt);
    }else{
        console.log("404 Error")
    }

}
module.exports = {
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}