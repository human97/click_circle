let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

let colors = ['red', 'blue', 'green', 'yellow', 'pink', 'orange', 'black', 'grey']
let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'disabled')
    isGameStarted = true
    $game.style.backgroundColor = '#ffffff'

    hide($start)

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - .1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    hide($resultHeader)
    show($timeHeader)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#cccccc'
    hide($timeHeader)
    show($resultHeader)
    $gameTime.removeAttribute('disabled')
}

function handBoxClick(e) {
    if (!isGameStarted) {
        return
    }
    if (e.target.dataset.box) {
        score++
        renderBox()
    }
}

// функция случайной генерации квадра в поле игры
function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(20, 50)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    let randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.borderRadius = '50%'

    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}