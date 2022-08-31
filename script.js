const cellElements = document.querySelectorAll('.cell')
let circleTurn = 'x'
const grid = document.querySelector('.grid-container')
const winningMessageElement = document.querySelector('.winning-message')
const winningMessageTextElement = document.querySelector('.winning-message-text')
const restartElement = document.querySelector('.button')
const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

startGame()

restartElement.addEventListener('click', startGame)

function startGame() {
    grid.classList.add('x') //game starts with x
    winningMessageElement.classList.remove('show')
    for (cell of cellElements) {
        cell.classList.remove('o')
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    }
}

function handleClick(e) {
    const cell = e.target
    console.log(circleTurn)

    placeMark(cell)

    if (checkWin()) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        console.log('swaaping turns!')
        swapTurns()
        setGrid()
    }    
}

function isDraw() {
    let arrayCellElements = Array.from(cellElements)
    return arrayCellElements.every((cell) => {
        return cell.classList.contains('x') || cell.classList.contains('o')
    })
}

function swapTurns() {
    if (circleTurn == 'x') {
        circleTurn = 'o'
    } else {
        circleTurn = 'x'
    }
}

function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn == 'x' ? "X's" : "O's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell) {
    cell.classList.add(circleTurn)
}

function setGrid() {
    const grid = document.querySelector('.grid-container')
    grid.classList.remove('x')
    grid.classList.remove('o')
    grid.classList.add(circleTurn)

}

function checkWin() {
    return winningStates.some(state => {
        return state.every(index => {
            return cellElements[index].classList.contains(circleTurn)
        })
    })
}
