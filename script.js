function visualizeNQueens() {
    const n = parseInt(document.getElementById("n-value").value);
    const board = document.getElementById("chess-board");
    
    if (isNaN(n) || n < 4) {
        alert("Please enter a valid number N (>= 4).");
        return;
    }

    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${n}, 50px)`;
    board.style.gridTemplateRows = `repeat(${n}, 50px)`;

    const solution = solveNQueens(n);
    animateBoard(n, solution);
}

function createBoard(n, solution) {
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add((row + col) % 2 === 0 ? "white" : "black");
            
            if (solution[row] === col) {
                const queen = document.createElement("span");
                queen.classList.add("queen");
                queen.textContent = "♛";
                cell.appendChild(queen);
            }
            
            document.getElementById("chess-board").appendChild(cell);
        }
    }
}

function animateBoard(n, solution) {
    const delay = 500; // delay in milliseconds
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add((row + col) % 2 === 0 ? "white" : "black");
            
            document.getElementById("chess-board").appendChild(cell);

            if (solution[row] === col) {
                setTimeout(() => {
                    const queen = document.createElement("span");
                    queen.classList.add("queen");
                    queen.textContent = "♛";
                    cell.appendChild(queen);
                }, row * delay);
            }
        }
    }
}

function solveNQueens(n) {
    const solution = new Array(n).fill(-1);
    const cols = new Array(n).fill(false);
    const diag1 = new Array(2 * n - 1).fill(false);
    const diag2 = new Array(2 * n - 1).fill(false);

    function backtrack(row) {
        if (row === n) return true;

        for (let col = 0; col < n; col++) {
            if (cols[col] || diag1[row - col + n - 1] || diag2[row + col]) continue;

            solution[row] = col;
            cols[col] = diag1[row - col + n - 1] = diag2[row + col] = true;

            if (backtrack(row + 1)) return true;

            solution[row] = -1;
            cols[col] = diag1[row - col + n - 1] = diag2[row + col] = false;
        }
        return false;
    }

    backtrack(0);
    return solution;
}
