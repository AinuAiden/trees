//note.js
class Note {
    constructor(time, user, id, note) {
        this.time = time;
        this.user = user;
        this.id = id;
        this.note = note;
    }

    getNoteHTML(){
        return `
                <p>
                    <strong>${this.time} - ${this.user}</strong><br>
                    ${this.note}
                </p>
            `;
    }
}