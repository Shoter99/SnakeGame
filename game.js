import {SNAKE_SPEED, draw as drawSnake, update as updateSnake, getSnakeHead, snakeIntersects, getSnakeLength } from './snake.js'
import {draw as drawFood, update as updateFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.querySelector('#game-board')
const score = document.querySelector('.score')

function main(timeStamp){
    if(gameOver){ 
        window.location.reload()
        return alert("You lose!"); 
    }


    requestAnimationFrame(main)
    const secondsSinceLastRender = (timeStamp - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = timeStamp

    update()
    draw()
}


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
    score.innerHTML = getSnakeLength()-1
}