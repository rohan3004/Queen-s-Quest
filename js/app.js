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

function highlightCell(row, col, n, highlight) {
    const cellIndex = row * n + col;
    const cell = document.querySelectorAll('.cell')[cellIndex];
    if (highlight) {
        cell.classList.add('highlight');
    } else {
        cell.classList.remove('highlight');
    }
}

function isSafe(row, col, left, upperD, lowerD, n) {
    return left[row] === 0 && upperD[(n - 1) + (col - row)] === 0 && lowerD[row + col] === 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const placeQueens = (board, n) => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = ''; // Clear previous queens
    });

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 1) {
                const cell = cells[i * n + j];
                const queen = document.createElement('img');
                queen.src = 'assets/queen.png'; // Path to your queen image
                queen.classList.add('queen');
                cell.appendChild(queen);
            }
        }
    }
    glideSound.play();
};
async function solveNQueensUtil(board, col, n, left, upperD, lowerD) {
    if (col == n) {
        return true;
    }

    for (let row = 0; row < n; row++) {
        if (isSafe(row, col, left, upperD, lowerD, n)) {
            board[row][col] = 1;
            left[row] = 1;
            upperD[(n - 1) + (col - row)] = 1;
            lowerD[row + col] = 1;

            
            createBoard(n);
            placeQueens(board,n);
            await sleep(700);

            if(await solveNQueensUtil(board,col+1,n,left,upperD,lowerD)){
                return true;
            }


            // Backtrack
            highlightCell(row, col, n, true); // Highlight the cell in red
            board[row][col] = 0;
            left[row] = 0;
            upperD[(n - 1) + (col - row)] = 0;
            lowerD[row + col] = 0;
            await sleep(700); // Wait 500ms to visualize the step
            highlightCell(row, col, n, false); // Remove the highlight

            createBoard(n);
            placeQueens(board,n);
            await sleep(700); // Wait 500ms to visualize the step

        }
    }
    return false;
}

// Function to solve N-Queens problem
async function solveNQueens() {
    const n = parseInt(document.getElementById('nValue').value);
    if (isNaN(n) || n <= 0) {
        alert('Please enter a valid number greater than 0');
        return;
    }

    const board = Array.from({ length: n }, () => Array(n).fill(0));
    const left = Array(n).fill(0);
    const upperD = Array(2 * n - 1).fill(0);
    const lowerD = Array(2 * n - 1).fill(0);


    if (!await solveNQueensUtil(board, 0, n, left, upperD, lowerD)) {
        alert('No solution exists for ' + n + ' Queens in ' + n + 'x' + n + ' chess board!');
    }
    const backgroundMusic = document.getElementById('bgMusic');
    backgroundMusic.play();
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

    javascript.style.display = 'block';
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

        cells.forEach(cell => cell.classList.remove('highlight'));

    if (queenPositions.length === n) {
        const conflicts = isValidSolution(queenPositions);
        if (conflicts.length === 0) {
            congratsMessage.style.display = 'block';
            setTimeout(() => {
                congratsMessage.style.display = 'none';
            }, 3000); // Hide message after 3 seconds
        } else {
            conflicts.forEach(([r, c]) => {
                const index = r * n + c;
                cells[index].classList.add('highlight');
            });
            congratsMessage.style.display = 'none';
        }
    } else {
        congratsMessage.style.display = 'none';
    }
    }
    function isValidSolution(positions) {
        const conflicts = [];
        for (let i = 0; i < positions.length; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const [r1, c1] = positions[i];
                const [r2, c2] = positions[j];
                if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                    conflicts.push([r1, c1], [r2, c2]);
                }
            }
        }
        return conflicts;
    }
}
document.getElementById("currentYear").textContent = new Date().getFullYear();