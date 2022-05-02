import { expandSnake, onSnake } from "./snake.js"
import {randomGridPostion} from './grid.js'
let food = {x:5, y:5}
export let EXPANSION_RATE = 1
export function update() { 
    if(onSnake(food)) { 
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPostion()
    }
}

export function draw(gameBoard){ 
        const foodElem = document.createElement('div')
        foodElem.style.gridRowStart = food.y
        foodElem.style.gridColumnStart = food.x
        foodElem.classList.add('food')
        gameBoard.appendChild(foodElem)
}

function getRandomFoodPostion(){
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPostion()
    }
    return newFoodPosition
}

export function setExpansionRate(rate){
    EXPANSION_RATE = rate
}