// textUtils.js

function wrapText(context, text, x, y, maxChars, lineHeight) {
    var lines = splitTextIntoLines(text, maxChars);

    for (var i = 0; i < lines.length; i++) {
        context.fillText(lines[i], x, y + (i * lineHeight));
    }
}

function splitTextIntoLines(text, maxChars) {
    var words = text.split(' ');
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        if (currentLine.length + words[i].length + 1 > maxChars) {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine += ' ' + words[i];
        }
    }
    lines.push(currentLine);
    return lines;
}