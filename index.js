const gameBoard = (function() {
    
    //let board = ["1","2","3","4","5","6","7","8","9"];
    let board = ["","","","","","","","",""];
    let _currentPlayer = "&#10005;";
    let _Xmarker = "&#10005;";
    let _Omarker = "&#9711;";

    const  _togglePlayerMarker = () => {
        // Changes current player marker to the opposite marker - X to O || O to X
        _currentPlayer = _currentPlayer == _Xmarker ? _Omarker : _Xmarker;
    };

    const _isCellEmpty = (cell) => {
        // Checks if the given cell is empty 
        return cell.innerText == "" 
    };

    const _fillBoardWithMarker = (marker, index) => {
        // Sets the given 'board' array index value to the given marker 
        board[index] = marker == _Xmarker ? "x" : "o";
    };

    const _getMarkerValue = (marker) => {
        // Returns given marker as string "✕" or "◯"
        return marker == _Xmarker ? "✕" : "◯";
    }

    const _isBoardFilled = () => {
        // Checks if the board is completely filled
        return board.every(cell => cell != "");
    };

    const _handleWinnerMove = (winnerClass, marker) => {
        // 
        displayController.highlightWinnerClass(winnerClass, marker);
        console.log(`Player ${_getMarkerValue(marker)} WINS!`); // "✕" or "◯"
        return true;
    };

    const _checkClass = (cell, marker, cellClass) => {
        // Checks if markers are the same in the given class(row, column, diagonal)
        let cellsInClass = document.getElementsByClassName(cell.classList[cellClass]);
        for (let cell of cellsInClass) {
            if (cell.innerHTML != _getMarkerValue(marker)) {return false;}
        }
        return _handleWinnerMove(cellsInClass, marker);
    };

    const _checkRow = (cell, marker) => {
        // Checks if the given cells row is filled with the same marker
        return _checkClass(cell, marker, 1);
    };

    const _checkColumn = (cell, marker) => {
        // Checks if the given cells column is filled with the same marker
        return _checkClass(cell, marker, 2);
    };

    const _checkDiagonal = (cell, marker) => {
        // Checks if the given cells diagonal is filled with the same marker
        if (Number(cell.id) % 2 == 0) { //Only check diagonals if the given cell is in a corner or the center;
            // For the center cell(id=4) both first and second diagonal have to be checked
            return cell.id != 4 ? _checkClass(cell, marker, 3) : _checkClass(cell, marker, 3) || _checkClass(cell, marker, 4);
        }
    };

    const _isMoveWinner = (cell, marker) => {
        // Checks if the cell is connected by: row, column or diagonal, with 2 cells that have the same marker
        return _checkRow(cell, marker) || _checkColumn(cell, marker) || _checkDiagonal(cell, marker);
    }

    const _isGameOver = (cell, marker) => {
        // Checks if there are 3 markers in a row or if the game is tied
        return _isMoveWinner(cell, marker) || _isBoardFilled(); // If _isMoveWinner() == true then the _isBoardFilled() functions won't execute
    };

    const _handleRestartEvent = () => {
        // Sets all the 'board' array elements to empty strings and draws them in the table
        board.forEach((cell, index) => board[index] = "");
        displayController.removeCellMarkerColors();
        displayController.drawBoard();
    };

    const handlePlayerInput = (event) => {
        // Draws marker on current cell if it's empty and switches the current player, then checks if the game is over
        let cell = event.target; // The cell that was clicked on
        if (_isCellEmpty(cell) && cell.id != "game") {
            displayController.drawMarkerOnCell(cell, _currentPlayer);
            _fillBoardWithMarker(_currentPlayer, Number(cell.id));
            _isGameOver(cell, _currentPlayer);
            _togglePlayerMarker();
        }
        console.log(event);
    };

    const applyEventListeners = () => {
        document.getElementById("game").addEventListener("click", handlePlayerInput);
        document.getElementById("restart").addEventListener("click", _handleRestartEvent);
    };

    return {applyEventListeners, board};
})();



const displayController = (function() {

    //HTMLCollection containing all the cells
    let _cells = document.getElementById("gameBody").getElementsByClassName("cell"); 

    const drawBoard = () => {
        // Draws each value from the 'board' array to its corresponding cell
        for (let i = 0; i <= 8; i++) {
            _cells[i].innerHTML = gameBoard.board[i]; 
        }
    };

    const removeCellMarkerColors = () => {
        for (let cell of _cells) {
            cell.classList.remove("cellColorX", "cellColorO", "cellWinnerX", "cellWinnerY");
        }
    };

    const drawMarkerOnCell = (cell, marker) => {
        // Draws the given marker to a given cell
        cell.classList.add(marker == "&#10005;" ? "cellColorX" : "cellColorO");
        cell.innerHTML = marker;
    };

    const _crossOutRow = (winnerClass) => {

    };

    const highlightWinnerClass = (winnerClass, marker) => {
        // Highlights the winning cells
        for (let cell of winnerClass) {
            cell.classList.add(marker == "&#10005;" ? "cellWinnerX" : "cellWinnerY");
        }
    };

    return {drawBoard, drawMarkerOnCell, highlightWinnerClass, removeCellMarkerColors};
})();



const player = (marker) => {

    return {marker};
};

let playerX = player("&#10005;");
let playerO = player("&#9711;");

//document.getElementById("game").addEventListener("click", gameBoard.handlePlayerInput);
gameBoard.applyEventListeners();
displayController.drawBoard();