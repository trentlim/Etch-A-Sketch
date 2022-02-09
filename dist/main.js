// TODO:
// - Enable clear button
// - Enable rainbow/erase mode
// - Enable button style change when active

// ****************DOM OBJECTS****************
const grid = document.querySelector('#grid');
const gridSlider = document.querySelector('#grid-slider');
const gridSize = document.querySelector('#grid-size');
const colorPicker = document.querySelector('#color-picker');
const clearButton = document.querySelector('#clear-btn');

// *****************VARIABLES*****************
var currentColor = colorPicker.value;

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
// Changes the current color when the color picker is changed
colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value;
});

// Add an event listener to the slider which changes the grid size and label
gridSlider.addEventListener('input', () => {
    gridSize.textContent = `${gridSlider.value}x${gridSlider.value}`;
    changeGrid(gridSlider.value);
});

// Add an event listener to each grid item which changes the background color if mouse1 is down
grid.addEventListener('mouseover', (e) => {
    if (e.buttons !== 1) return;
    e.target.style.backgroundColor = currentColor;
});
grid.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = currentColor;
});

// *****************PAGE LOAD*****************
// Change grid size to 16x16 when page loads
changeGrid(gridSlider.value);