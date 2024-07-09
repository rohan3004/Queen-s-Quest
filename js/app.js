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
        queen.src = 'assets/queen.png'; // Path to your queen image
        queen.classList.add('queen');
        const cellIndex = i * n + col;
        cells[cellIndex].appendChild(queen);
    }
    glideSound.play();
}

function isSafe(row, col, left, upperD, lowerD, n) {
    return left[row] === 0 && upperD[(n - 1) + (col - row)] === 0 && lowerD[row + col] === 0;
}

function solveNQueensUtil(board, col, n, ans, left, upperD, lowerD) {
    if (col == n) {
        ans.push(board.map(row => [...row]));
        return;
    }

    for (let row = 0; row < n; row++) {
        if (isSafe(row, col, left, upperD, lowerD, n)) {
            board[row][col] = 1;
            left[row] = 1;
            upperD[(n - 1) + (col - row)] = 1;
            lowerD[row + col] = 1;
            solveNQueensUtil(board, col + 1, n, ans, left, upperD, lowerD);
            board[row][col] = 0;
            left[row] = 0;
            upperD[(n - 1) + (col - row)] = 0;
            lowerD[row + col] = 0;
        }
    }
}

// Function to solve N-Queens problem
function solveNQueens() {
    const n = parseInt(document.getElementById('nValue').value);
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    const board = Array.from({ length: n }, () => Array(n).fill(0));
    const ans = [];
    const left = Array(n).fill(0);
    const upperD = Array(2 * n - 1).fill(0);
    const lowerD = Array(2 * n - 1).fill(0);


    solveNQueensUtil(board, 0, n, ans, left, upperD, lowerD);

    if (ans.length > 0) {
        createBoard(n);
        placeQueens(ans[0], n);
    } else {
        alert('No solution exists for ' + n + ' Queens in ' + n + 'x' + n + ' chess board!');
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
    const backgroundMusic = document.getElementById('bgMusic');
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


    const backgroundMusic = document.getElementById('bgMusic');
    backgroundMusic.play();
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
        queen.src = 'assets/queen.png'; // Path to your queen image
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