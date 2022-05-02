import {SNAKE_SPEED, draw as drawSnake, update as updateSnake, getSnakeHead, snakeIntersects, getSnakeLength, setSnakeSpeed } from './snake.js'
import {EXPANSION_RATE, draw as drawFood, setExpansionRate, update as updateFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.querySelector('#game-board')
const score = document.querySelector('.score')
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const difficulty = urlParams.get('difficulty')

function setDifficulty(difficulty){
    console.log(difficulty)
    switch(difficulty){
        case 'Easy':
            setExpansionRate(1)
            setSnakeSpeed(4)
            break
        case 'Medium':
            setExpansionRate(2)
            setSnakeSpeed(7)
            break
        case 'Hard':
            setExpansionRate(3)
            setSnakeSpeed(10)
            break
        default:
            setExpansionRate(1)
            setSnakeSpeed(4)
            break
    }
}

function main(timeStamp){
    if(gameOver){ 
        saveHighscore()
        window.location.href = './index.html'
        return alert(
            `You lose!\nYour score: ${score.innerHTML}\nHighscore: ${localStorage.getItem('highscore') ? localStorage.getItem('highscore') : "NaN"}`
            ); 

    }


    requestAnimationFrame(main)
    const secondsSinceLastRender = (timeStamp - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    lastRenderTime = timeStamp
    
    update()
    draw()
}

setDifficulty(difficulty)
window.requestAnimationFrame(main)


function update(){ 
    updateSnake()
    updateFood()
    checkDeath()
    updateScore()
}
function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersects()
}
function updateScore(){
    score.innerHTML = Math.ceil((getSnakeLength()/EXPANSION_RATE)-1)
}
function saveHighscore(){ 
    if(localStorage.getItem('highscore') === null){ 
        return localStorage.setItem('highscore', score.innerHTML)
    }
    if(parseInt(localStorage.getItem('highscore')) < parseInt(score.innerHTML)){
        localStorage.setItem('highscore', score.innerHTML)
    }
}