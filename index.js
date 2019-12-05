const gameBoard = (function() {

    //let _board = ["x","x","x","x","x","x","x","o","o"];
    let board = ["","","","","","","","",""];
    let _currentPlayer = "&#10005;";
    let _Xmarker = "&#10005;";
    let _Omarker = "&#9711;";

    const  _togglePlayerMarker = () => {
        // Changes current player marker to the opposite marker - X to O || O to X
        _currentPlayer == _Xmarker ? _currentPlayer = _Omarker : _currentPlayer = _Xmarker;
    };

    const _isCellEmpty = (cell) => {
        // Checks if the given cell is empty 
        return cell.innerText == "" 
    };

    const _fillBoardWithMarker = (marker, index) => {
        // Sets the given 'board' array index value to the given marker 
        marker == _Xmarker ? board[index] = "x" : board[index] = "o";
    };

    const handlePlayerInput = (event) => {
        // Draws marker on current cell if it's empty and switches the current player
        let cell = event.target; // The cell that was clicked on
        if (_isCellEmpty(cell)) {
            displayController.drawMarkerOnCell(cell, _currentPlayer);
            _fillBoardWithMarker(_currentPlayer, Number(cell.id));
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

document.getElementById("gameBody").addEventListener("click", gameBoard.handlePlayerInput);
displayController.drawBoard();