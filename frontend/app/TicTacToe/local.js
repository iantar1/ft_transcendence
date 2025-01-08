export function localTicTacToe(){
    const style = document.createElement('style');
    style.textContent = `
    .game-TTT {
        background-color: #000;
        color: rgb(4, 28,68, 1);
        font-family: 'Courier New', monospace;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
        background-image: 
            radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
            radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
            radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px);
        background-size: 550px 550px, 350px 350px, 250px 250px;
        background-position: 0 0, 40px 60px, 130px 270px;
    }

    .game-title {
        font-size: 2.5em;
        text-shadow: 0 0 10px rgb(4, 28,68, 1);
        margin-bottom: 20px;
        text-transform: uppercase;
    }

    .status {
        font-size: 1.2em;
        margin: 20px 0;
        text-shadow: 0 0 5px rgb(4, 28,68, 1);
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        background: #000;
        padding: 20px;
        border: 4px solid rgb(4, 28,68, 1);
        box-shadow: 0 0 20px rgb(4, 28,68, 1);
        border-radius: 5px;
    }

    .cell {
        width: 100px;
        height: 100px;
        background: var(--blue);
        border: 3px solid rgb(4, 28,68, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cell:hover {
        background: rgba(4, 28,68,0.5);
        box-shadow: 0 0 10px rgb(4, 28,68, 1);
    }

    .reset-btn {
        margin-top: 20px;
        padding: 10px 20px;
        font-family: 'Courier New', monospace;
        font-size: 1.2em;
        background: var(--red);
        color: white;
        border: none;
        border-radius : 5px;
        cursor: pointer;
        text-transform: uppercase;
        transition: all 0.3s ease;
    }

    .reset-btn:hover {
        background: rgba(4, 28,68,0.5);
        box-shadow: 0 0 10px rgb(4, 28,68, 1);
    }

    @keyframes win-flash {
        0% { box-shadow: 0 0 10px rgb(4, 28,68, 1); }
        50% { box-shadow: 0 0 30px rgb(4, 28,68, 1); }
        100% { box-shadow: 0 0 10px rgb(4, 28,68, 1); }
    }

    .win {
        background: rgba(4, 28,68,0.5);
        animation: win-flash 1s infinite;
    }`;

    const content = document.createElement('div');
    content.classList = "game-TTT"
    content.innerHTML = `
        <h1 class="game-title">Tic Tac Toe</h1>
        <div class="status">Player X's turn</div>
        <div class="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <button class="reset-btn">Reset Game</button>`;

    class TicTacToe {
        constructor() {
            this.board = Array(9).fill('');
            this.currentPlayer = 'X';
            this.gameActive = true;
            this.cells = content.querySelectorAll('.cell');
            this.statusDisplay = content.querySelector('.status');
            this.resetButton = content.querySelector('.reset-btn');
            
            this.initializeGame();
        }

        initializeGame() {
            this.cells.forEach(cell => {
                cell.addEventListener('click', () => this.handleCellClick(cell));
            });
            this.resetButton.addEventListener('click', () => this.resetGame());
        }

        handleCellClick(cell) {
            const index = cell.getAttribute('data-index');

            if (this.board[index] === '' && this.gameActive) {
                this.board[index] = this.currentPlayer;
                cell.textContent = this.currentPlayer;
                
                if (this.checkWin()) {
                    this.statusDisplay.textContent = `Player ${this.currentPlayer} wins!`;
                    this.gameActive = false;
                    this.highlightWinningCells();
                    return;
                }

                if (this.checkDraw()) {
                    this.statusDisplay.textContent = "Game ended in a draw!";
                    this.gameActive = false;
                    return;
                }

                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
            }
        }

        checkWin() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];

            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return this.board[a] &&
                       this.board[a] === this.board[b] &&
                       this.board[a] === this.board[c];
            });
        }

        highlightWinningCells() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (this.board[a] &&
                    this.board[a] === this.board[b] &&
                    this.board[a] === this.board[c]) {
                    this.cells[a].classList.add('win');
                    this.cells[b].classList.add('win');
                    this.cells[c].classList.add('win');
                    break;
                }
            }
        }

        checkDraw() {
            return !this.board.includes('');
        }

        resetGame() {
            this.board = Array(9).fill('');
            this.currentPlayer = 'X';
            this.gameActive = true;
            this.cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('win');
            });
            this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
        }
    }

    const game = new TicTacToe();

    const parent = document.createElement('div');
    parent.style.height = "100%";
    parent.appendChild(style);
    parent.appendChild(content);

    return parent;
}