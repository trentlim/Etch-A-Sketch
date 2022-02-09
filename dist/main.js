// ****************DOM OBJECTS****************
const grid = document.querySelector('#grid');
const controlPanel = document.querySelector('#control-panel');
const gridSlider = document.querySelector('#grid-slider');
const gridSizeLabel = document.querySelector('#grid-size');
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear-btn');
const mainButtons = document.querySelectorAll('#color-btn, #rainbow-btn, #erase-btn');

// *****************VARIABLES*****************
var currentColor = colorPicker.value;
var currentMode = 'color';

// *****************FUNCTIONS*****************
// Updates the grid to a new size
function changeGrid(size) {
    const squares = grid.querySelectorAll('div');
    squares.forEach(square => {
        grid.removeChild(square);
    })

    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < (size * size); i++) {
        const div = document.createElement('div');
        div.classList.add(`grid-item-${i}`);
        div.style.border = '1px solid #f2f2f2';
        grid.appendChild(div);
    }
}

// **************EVENT LISTENERS**************
// Change the current mode depending on which button the user clicks
controlPanel.addEventListener('click', (e) => {
    if (e.target.id != 'color-btn' && e.target.id != 'rainbow-btn' && e.target.id != 'erase-btn') {
        return;
    }

    currentMode = e.target.id.replace('-btn', '');
    mainButtons.forEach(button => {
        button.classList.remove('active-btn');
        button.classList.add('inactive-btn');
    });

    // console.log(e.target.id);
    const currentButton = document.querySelector(`#${e.target.id}`);
    console.log(currentButton);
    currentButton.classList.remove('inactive-btn');
    currentButton.classList.add('active-btn');
});

// Changes the current color when the color picker is changed
colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value;
});

// Clear the canvas when the "Clear Canvas" button is clicked
clearButton.addEventListener('click', () => {
    changeGrid(gridSlider.value);
});

// Add an event listener to the slider which changes the grid size and label
gridSlider.addEventListener('input', () => {
    gridSizeLabel.textContent = `${gridSlider.value}x${gridSlider.value}`;
    changeGrid(gridSlider.value);
});

// Add an event listener to each grid item which changes the background color if mouse1 is down
grid.addEventListener('mouseover', (e) => {
    if (e.buttons !== 1) return;

    // Changes the background color of the grid item depending on the current mode
    switch (currentMode) {
        case 'color':
            e.target.style.backgroundColor = currentColor;
            break;
        case 'rainbow':
            e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            // e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
            break;
        case 'erase':
            e.target.style.backgroundColor = '';
            break;
    }
});
grid.addEventListener('mousedown', (e) => {
    e.preventDefault();

    switch (currentMode) {
        case 'color':
            e.target.style.backgroundColor = currentColor;
            break;
        case 'rainbow':
            e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
            // e.target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
            break;
        case 'erase':
            e.target.style.backgroundColor = '';
            break;
    }
});

// *****************PAGE LOAD*****************
// Change grid size to 16x16 when page loads
changeGrid(gridSlider.value);