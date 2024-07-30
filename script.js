const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');

// Show notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes') || '';
    attachDeleteEvent();
}
showNotes();

// Update localStorage
function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

// Create a new note
createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute('contenteditable', 'true');
    img.src = 'img/delete.png';
    notesContainer.appendChild(inputBox).appendChild(img);
    attachDeleteEvent();
    inputBox.addEventListener('keyup', updateStorage);
});

// Attach delete event to all delete buttons
function attachDeleteEvent() {
    let deleteButtons = document.querySelectorAll('.input-box img');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            updateStorage();
        });
    });

    let notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
        note.addEventListener('keyup', updateStorage);
    });
}

// Prevent Enter key from creating a new paragraph
document.addEventListener('keydown', event => {
    if (event.key === "Enter") {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});
