const X_CLASS = 'x'
const C_CLASS= 'circle'
const WINNING_COMBOS = [ /* Making an array full of winning combos */
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    [1,4,7]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()
// by clicking restart it'll rerun the function startGame()
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false // to start as X_CLASS
    cellElements.forEach(cell => {
        // as it run on each sell, it deletes all the classes in the cells
        // and even the eventListener for the handleClick function
        cell.classList.remove(X_CLASS)
        cell.classList.remove(C_CLASS)
        cell.removeEventListener('click', handleClick)
        
        // does a click event once on each cell so we wont override anything
        cell.addEventListener('click', handleClick, { once:true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? C_CLASS : X_CLASS
    // Placing a mark!
    placeMark(cell, currentClass)
    // Checking for a win!
    if(checkWin(currentClass)) {
        endGame(false)
        // Checking for a Draw!
    } else if (isDraw()) {
        endGame(true)
    } else {
        // Switching Turns!
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    // checking every single cell has been filled
    return [...cellElements].every(cell => { // distract the cellElements into an array
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(C_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// swapping turns by changing the boolean expression over and over
function swapTurns() {
    circleTurn = !circleTurn
}

// after clicking once we'll see the proper hover state
// then we'll add this method at the begginning so we'll see the hover mark
// on the first X_Class
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(C_CLASS)
    if(circleTurn) {
        board.classList.add(C_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    // .some returns true if any of the combos is true
    return WINNING_COMBOS.some(combination => {
        // checking if all the values in the cell elements have the same class
        return combination.every(index => {
            // checking if each cell contains the current class (X_CLASS for example)
            return cellElements[index].classList.contains(currentClass)
        })
    })
}