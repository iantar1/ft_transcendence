export function RemoteTicTacToe(){
    const style = document.createElement('style');
    style.textContent = `
    .game-TTT {
        background-color: #000;
        color: cyan;
        font-family: 'Arial', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 0;
    }

    .game-title {
        font-size: 2.5em;
        text-shadow: 0 0 10px cyan;
        margin-bottom: 20px;
        text-transform: uppercase;
    }

    .status {
        font-size: 1.2em;
        margin: 20px 0;
        text-shadow: 0 0 5px cyan;
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        background: #000;
        padding: 20px;
        border: 4px solid cyan;
        box-shadow: 0 0 20px cyan;
        border-radius: 5px;
    }

    .cell {
        font-family: 'Arial', sans-serif;
        width: 100px;
        height: 100px;
        background: rgba(4, 28,68,0.5);
        border: 3px solid #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cell:hover {
        background: rgba(4, 28,68,0.5);
        box-shadow: 0 0 10px cyan;
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
        box-shadow: 0 0 10px cyan;
    }

    @keyframes win-flash-X {
        0% { 
            box-shadow: 0 0 10px cyan;
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 30px cyan;
            transform: scale(1.1);
        }
        100% { 
            box-shadow: 0 0 10px cyan;
            transform: scale(1);
        }
    }

    @keyframes win-flash-O {
        0% { 
            box-shadow: 0 0 10px red;
            transform: scale(1);
        }
        50% { 
            box-shadow: 0 0 30px red;
            transform: scale(1.1);
        }
        100% { 
            box-shadow: 0 0 10px red;
            transform: scale(1);
        }
    }

    .win-X {
        background: var(--blue);
        animation: win-flash-X 1s infinite;
    }

    .win-O {
        background: var(--blue);
        animation: win-flash-O 1s infinite;
    }
    `;

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
        <button class="reset-btn">Reset Game</button>
    `;



    // socket
    const WS_URL = 'wss://'+window.location.host+'/TicTacToe/Remote/';
    const socket = new WebSocket(WS_URL);

    let board = Array(9).fill('');
    let role = 'X';
    let currentPlayer = 'X';
    let gameActive = true;
    let cells = content.querySelectorAll('.cell');
    let statusDisplay = content.querySelector('.status');
    let resetButton = content.querySelector('.reset-btn');
    
    initializeGame();

    function initializeGame() {
        cells.forEach(cell => {
            cell.addEventListener('click', () => handleCellClick(cell));
        });
        resetButton.addEventListener('click', () => resetGame());
    }

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        socket.send(JSON.stringify({
            'position': index,
        }));

        if (board[index] === '' && gameActive && currentPlayer === role) {
            
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if(currentPlayer === 'X'){

                cell.style.textShadow = "cyan 1px 0 10px"
                cell.style.color = "cyan";
            }
            else {
                cell.style.textShadow = "red 1px 0 10px"
                cell.style.color = "red";
            }

            
            if (checkWin()) {
                statusDisplay.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                highlightWinningCells();
                return;
            }

            if (checkDraw()) {
                statusDisplay.textContent = "Game ended in a draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
            
            socket.send(JSON.stringify({
                'type': 'update',
                'position': index,
            }));
        }
    }

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] &&
                    board[a] === board[b] &&
                    board[a] === board[c];
        });
    }

    function highlightWinningCells() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]) {
                    let win;
                    if (currentPlayer === 'X')
                        win = 'win-X';
                    else
                        win = 'win-O';
                cells[a].classList.add(win);
                cells[b].classList.add(win);
                cells[c].classList.add(win);
                break;
            }
        }
    }

    function checkDraw() {
        return !board.includes('');
    }

    function resetGame() {
        board = Array(9).fill('');
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win-X');
            cell.classList.remove('win-O');
        });
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }


    
    socket.onopen = () => {
        console.log("Connected to the WebSocket!");
        // socket.send(JSON.stringify({
        // }));
    };
    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if(data.type == "start"){
            role = data.role;
            board = data.board;
            currentPlayer = data.currentPlayer;
        }
    };
    socket.onclose = () => {
        console.log("WebSocket closed!");
    };
    socket.onerror = () => {
        console.log("Connection Error for WebSocket!");
    };


    const parent = document.createElement('div');
    parent.style.height = "100%";
    parent.appendChild(style);
    parent.appendChild(content);

    return parent;
}