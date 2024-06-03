//note.js
class Note {
    constructor(time, user, id, note,tags) {
        this.time = time;
        this.user = user;
        this.id = id;
        this.note = note;
        this.tags = tags;
    }

    getNoteHTML(){
        
        return `
                <p>
                    <strong>${this.time} - ${this.user}</strong><br>
                    ${this.note}
                    ${this.getTagsHTML()}
                </p>
            `;
    }

    getTagsHTML(){
        if (this.tags ==="") {
            return "";
        }
        let tagsHTML = "";
        this.tags.split(",").forEach(tag => tagsHTML += `<div class="noteTag">${tag}</div>`);
        return tagsHTML;
    }
}