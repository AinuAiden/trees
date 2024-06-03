//main.js
const MAP_SCALE = 3.3;
const PADDING = 60;
const canvas = document.getElementById('orchardCanvas');
const ctx = canvas.getContext('2d');
const treeDetailsDiv = document.getElementById('treeDetails');
const hoverInfoDiv = document.getElementById('hoverInfo');
const googleForm = document.getElementById('googleForm');
const noteFormContainer = document.getElementById('noteFormContainer');
const makeNoteButton = document.getElementById('makeNoteButton');
let trees = [];
let notes = [];
let selectedTreeId = null;


function drawTrees() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trees.forEach(tree => {
        tree.draw(ctx, tree.id === selectedTreeId)
    });
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) * (canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
}


function displayTreeDetails(tree) {
    selectedTreeId = tree.id;
    treeDetailsDiv.innerHTML = tree.getDetailsHTML();
    noteFormContainer.style.display = 'none'; // Hide note form initially
    makeNoteButton.style.display = 'block';
    drawTrees();

    // Set the source of the images
    const treeImage = document.getElementById('treeImage');
    treeImage.src = `photos/June 2, 2024/day/${tree.id}.jpg`;

    const treeImageNight = document.getElementById('treeImageNight');
    treeImageNight.src = `photos/June 2, 2024/night/${tree.id}.jpg`;
}

function updateURLParameter(treeId) {
    const url = new URL(window.location);
    url.searchParams.set('treeId', treeId);
    window.history.pushState({}, '', url);
}

function updateGoogleForm(treeId) {
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSd4n5wpalR97KiW5ppOsb1fnqSRI2W4B_VH4x_y8y0F36UaQg/viewform?embedded=true&usp=pp_url&entry.1147721308=${treeId}`;
    if (googleForm.src !== formUrl) {
        googleForm.src = formUrl;
    }
}

function initialize() {
    const treeId = new URLSearchParams(window.location.search).get('treeId');
    if (treeId) {
        const selectedTree = trees.find(tree => tree.id === treeId);
        if (selectedTree) {
            displayTreeDetails(selectedTree);
        } else {
            noteFormContainer.style.display = 'none';
            treeDetailsDiv.innerHTML = 'Tree not found.';
        }
    } else {
        updateGoogleForm(''); // Reset form if no tree is selected
    }
}

canvas.addEventListener('click', function (evt) {
    const mousePos = getMousePos(canvas, evt);
    const clickedTree = trees.find(tree => tree.isPointInTree(mousePos.x, mousePos.y));

    if (clickedTree) {
        displayTreeDetails(clickedTree);
        updateURLParameter(clickedTree.id);
    }
});

makeNoteButton.addEventListener('click', function () {
    noteFormContainer.style.display = 'block'; // Show note form on button click
    makeNoteButton.style.display = 'none';
    updateGoogleForm(selectedTreeId); // Load form for the selected tree
});

function fetchTreeData() {
    const sheetId = '1boH22hYT8um6i3UyCf33GHJVZmnFic-k5TZsQmfNrHY';
    const sheetRange = 'map!A2:L';
    const apiKey = 'AIzaSyBs9Du6hrji1fMUaUcbAy7nviu7EssKkV0';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            trees = data.values.map(row => new Tree(
                parseFloat(row[0]),
                parseFloat(row[1]),
                row[2],
                row[3],
                row[4],
                row[5],
                row[6],
                row[7],
                row[8],
                row[9],
                row[10],
                row[11],
                row[12] || ''
            ));
            drawTrees();
            fetchNotes();
        })
        .catch(error => console.error('Error loading trees:', error));
}

function fetchNotes() {
    const sheetId = '1dH1oBXTx4CtOVU8jE7PhWrfM7iSyzekNAeW7QaOXcFc';
    const sheetRange = 'notes!A2:D';
    const apiKey = 'AIzaSyBs9Du6hrji1fMUaUcbAy7nviu7EssKkV0';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            notes = data.values.map(row => new Note(
                row[0],
                row[1],
                row[2],
                row[3] || ''
            ));
            
            initialize();
        })
        .catch(error => console.error('Error loading notes:', error));
    
}

fetchTreeData();