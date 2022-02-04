const grid = document.querySelector('#grid');

for (let i = 0; i < 256; i++) {
    const div = document.createElement('div');
    div.classList.add(`grid-item-${i}`);
    div.style.border = '1px solid #f2f2f2';
    grid.appendChild(div);
}