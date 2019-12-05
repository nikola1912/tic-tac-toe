const gameBoard = (function() {
    
    let board = ["1","2","3","4","5","6","7","8","9"];
    //let board = ["","","","","","","","",""];
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

    const _isMarkerThirdInRow = (cell, marker) => {
        // Checks if the given cells row is filled with the same marker
        let markerHTMLsign = _getMarkerValue(marker); // "✕" or "◯"
        let cellsInSameRow = document.getElementsByClassName(cell.classList[1]);
        for (let cell of cellsInSameRow) {
            if (cell.innerHTML != markerHTMLsign) {return false;}
        }
        console.log(`Player ${markerHTMLsign} WINS!`);
        return true;
    }

    const _isMarkerThirdInColumn = (cell, marker) => {
        let markerHTMLsign = _getMarkerValue(marker); // "✕" or "◯"
        let cellsInSameColumn = document.getElementsByClassName(cell.classList[2]);
        for (let cell of cellsInSameColumn) {
            if (cell.innerHTML != markerHTMLsign) {return false;}
        }
        console.log(`Player ${markerHTMLsign} WINS!`);
        return true;
    }

    const _isMarkerThirdInDiagonal = (cell, marker) => {

    };

    const _isMoveWinner = (cell, marker) => {
        // Checks if the cell is connected by: row, column or diagonal, with 2 cells that have the same marker
        return _isMarkerThirdInRow(cell, marker) || _isMarkerThirdInColumn(cell, marker) || _isMarkerThirdInDiagonal(cell, marker);
    }

    const _isGameOver = (cell, marker) => {
        // Checks if there are 3 markers in a row or if the game is tied
        return _isMoveWinner(cell, marker) || _isBoardFilled();
    };

    const handlePlayerInput = (event) => {
        // Draws marker on current cell if it's empty and switches the current player, then checks if the game is over
        let cell = event.target; // The cell that was clicked on
        if (_isCellEmpty(cell)) {
            displayController.drawMarkerOnCell(cell, _currentPlayer);
            _fillBoardWithMarker(_currentPlayer, Number(cell.id));
            _isGameOver(cell, _currentPlayer);
            _togglePlayerMarker();
        }
        console.log(event);
    };

    return {handlePlayerInput, board};
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

    const drawMarkerOnCell = (cell, marker) => {
        // Draws the given marker to a given cell
        cell.innerHTML = marker;
    };

    return {drawBoard, drawMarkerOnCell};
})();



const player = (marker) => {

    return {marker};
};

let playerX = player("&#10005;");
let playerO = player("&#9711;");

document.getElementById("game").addEventListener("click", gameBoard.handlePlayerInput);
displayController.drawBoard();