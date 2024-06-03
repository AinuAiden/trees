//tree.js
class Tree {
    constructor(x, y, id, cultivar, rootstock, grade, grafter, graftType, grafteDate, nurseryDate, graftComment, orchardDate) {
        this.x = canvas.width - (x * MAP_SCALE + PADDING);
        this.y = (y + 30) * MAP_SCALE;
        this.id = id;
        this.cultivar = cultivar;
        this.rootstock = rootstock;
        this.grade = grade;
        this.grafter = grafter;
        this.graftType = graftType;
        this.grafteDate = grafteDate;
        this.nurseryDate = nurseryDate;
        this.graftComment = graftComment;
        this.orchardDate = orchardDate;

        if (this.cultivar === "#N/A") {
            this.cultivar = "";
        }
    }

    getNotes() {
        return notes.filter(note => note.id == this.id);
    }

    getDetailsHTML(){
        
        let notesHTML = "";
        this.getNotes().forEach(note => notesHTML += note.getNoteHTML());
        return `
                <h2>${this.cultivar} [${this.id}]</h2>
                <p>
                <strong>Rootstock:</strong> ${this.rootstock}<br>
                <strong>Grade:</strong> ${this.grade}<br>
                <strong>Planted in Orchard:</strong> ${this.orchardDate}<br>
                </p>
                <p>
                <strong>Grafter:</strong> ${this.grafter}<br>
                <strong>Graft Date:</strong> ${this.grafteDate}<br>
                <strong>Graft Method:</strong> ${this.graftType}<br>
                ${this.graftComment ? "<strong>Comment: </strong>" + this.graftComment + "<br>" : ""}
                
                </p>
                ${notesHTML ? "<h2>Notes</h2>" : ""}
                ${notesHTML}
                `;
    }

    draw(ctx,isSelected){
        ctx.beginPath();
        let markerSize = isSelected ? 15 : 10
        if (this.cultivar) {
            ctx.arc(this.x, this.y, markerSize, 0, Math.PI * 2);
        } else {
            ctx.rect(this.x - markerSize / 2, this.y - markerSize / 2, markerSize, markerSize);
        }
        ctx.fillStyle = 'green';
        if (this.grade.includes("oot")) {
            ctx.fillStyle = 'yellow';
        }
        if (this.grade.includes("ead")) {
            ctx.fillStyle = 'grey';
        }
        if (isSelected) {
            ctx.fillStyle = 'red';
        }
        ctx.fill();

        ctx.save(); // Save the current state of the context
        ctx.translate(this.x - 5, this.y); // Move the origin to the tree's position
        ctx.rotate(Math.PI / 4); // Rotate the context by 45 degrees
        ctx.font = '12px Verdana, sans-serif';
        if (isSelected) {
            ctx.font = '14px Verdana, sans-serif';
        }
        ctx.fillStyle = 'black';

        // Draw the tree name next to the dot.
        wrapText(ctx, this.cultivar, 0, 0, 10, 11);

        ctx.restore(); // Restore the context to its state before we moved the origin and rotated it

        if (isSelected) {
            ctx.fillStyle = 'black';
            ctx.font = '24px Verdana, sans-serif';
            ctx.fillText("ID: " + this.id, canvas.width - 150, 30);
        }
    }

    isPointInTree(x, y) {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return distance <= 25;
    }
}