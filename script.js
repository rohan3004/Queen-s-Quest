// Function to create the chessboard
function createBoard(n) {
    const board = document.querySelector('.board');
    board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    board.innerHTML = '';

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((i + j) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
            board.appendChild(cell);
        }
    }
}

// Function to place queens on the board
function placeQueens(board, n) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear previous queens
    });

    for (let i = 0; i < n; i++) {
        const row = board[i];
        const col = row.indexOf(1);
        const queen = document.createElement('img');
        queen.src = 'queen.png'; // Path to your queen image
        queen.classList.add('queen');
        const cellIndex = i * n + col;
        cells[cellIndex].appendChild(queen);
    }
    glideSound.play();
}

// Utility function to check if the queen placement is safe
function isSafe(board, row, col, n) {
    for (let i = 0; i < col; i++)
        if (board[row][i] === 1) return false;

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] === 1) return false;

    for (let i = row, j = col; j >= 0 && i < n; i++, j--)
        if (board[i][j] === 1) return false;

    return true;
}

// Recursive utility function to solve N-Queens problem
function solveNQueensUtil(board, col, n) {
    if (col >= n) return true;

    for (let i = 0; i < n; i++) {
        if (isSafe(board, i, col, n)) {
            board[i][col] = 1;
            if (solveNQueensUtil(board, col + 1, n)) return true;
            board[i][col] = 0;
        }
    }

    return false;
}

// Function to solve N-Queens problem
function solveNQueens() {
    const n = parseInt(document.getElementById('nValue').value);
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    const board = Array.from({ length: n }, () => Array(n).fill(0));

    if (solveNQueensUtil(board, 0, n)) {
        createBoard(n);
        placeQueens(board, n);
    } else {
        alert('No solution exists for '+n+' Queens in '+n+'x'+n+' chess board!');
    }
}


const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('problemStatementModal');
    const btn = document.getElementById('problemStatementLink');
    const span = document.getElementsByClassName('close-btn')[0];
    const backgroundMusic = document.getElementById('backgroundMusic');
    const javascript = document.getElementById('code-javascript');
    
    const board = document.querySelector('.board');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((i + j) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
            board.appendChild(cell);
        }
    }

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }


    document.getElementById('copyCodeBtn').addEventListener('click', function() {
        // const selectedCode = document.querySelector('input[name="code-lang"]:checked').value;
        const codeToCopy = javascript.textContent;
        navigator.clipboard.writeText(codeToCopy).then(() => {
            alert('Code copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy code: ', err);
        });
    });

    // Initially show Java code
    javascript.style.display = 'block';

    backgroundMusic.play();
});

function play(){
    const n = parseInt(document.getElementById('nValue').value);
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    const glideSound = document.getElementById('glideSound');
    const board = document.querySelector('.board');
    board.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    board.innerHTML = '';

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((i + j) % 2 === 0) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
            board.appendChild(cell);
        }
    }

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear previous queens
    });

    for (let i = 0; i < n; i++) {
        const queen = document.createElement('img');
        queen.src = 'queen.png'; // Path to your queen image
        queen.classList.add('queen');
        queen.draggable = true;
        cells[i * n + i].appendChild(queen);
        queen.addEventListener('dragstart', handleDragStart);
        queen.addEventListener('dragend', handleDragEnd);
        queen.addEventListener('touchstart', handleTouchStart);
        queen.addEventListener('touchmove', handleTouchMove);
        queen.addEventListener('touchend', handleTouchEnd);
    }

    const squares = document.querySelectorAll('.cell');

    squares.forEach(square =>{
        square.addEventListener('dragover',handleDragOver);
        square.addEventListener('drop',handleDrop);
    });

    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => {
            this.classList.add('invisible');
        }, 0);
    }

    function handleDragEnd() {
        this.classList.remove('invisible');
        checkSolution();
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        if (this !== draggedItem.parentElement) {
            this.appendChild(draggedItem);
            glideSound.play();
        }
    }

    let touchX = 0;
    let touchY = 0;

    function handleTouchStart(e) {
        draggedItem = this;
        const touch = e.touches[0];
        const offsetX = touch.clientX - touch.target.getBoundingClientRect().left;
        const offsetY = touch.clientY - touch.target.getBoundingClientRect().top;
        draggedItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const offsetX = touch.clientX - touch.target.getBoundingClientRect().left;
        const offsetY = touch.clientY - touch.target.getBoundingClientRect().top;
        draggedItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    function handleTouchEnd(e) {
        if (draggedItem) {
            const touch = e.changedTouches[0];
            const targetCell = document.elementFromPoint(touch.clientX, touch.clientY);
            if (targetCell && targetCell.classList.contains('cell')) {
                targetCell.appendChild(draggedItem);
                glideSound.play();
                checkSolution();
            }
            draggedItem.style.transform = 'translate(0, 0)';
        }
        draggedItem = null;
    }



    function checkSolution() {
        const queenPositions = [];
        cells.forEach((cell, index) => {
            if (cell.querySelector('.queen')) {
                const row = Math.floor(index / n);
                const col = index % n;
                queenPositions.push([row, col]);
            }
        });

        if (queenPositions.length === n && isValidSolution(queenPositions)) {
            congratsMessage.style.display = 'block';
            setTimeout(() => {
                congratsMessage.style.display = 'none';
            }, 3000); // Hide message after 5 seconds
        } else {
            congratsMessage.style.display = 'none';
        }
    }
    function isValidSolution(positions) {
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const [r1, c1] = positions[i];
                const [r2, c2] = positions[j];
                if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                    return false;
                }
            }
        }
        return true;
    }
}