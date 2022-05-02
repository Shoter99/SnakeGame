import { getInputDir } from "./input.js"

export const SNAKE_SPEED = 4
const snakeBody = [
    {x:11, y:11},
]
let newSegments = 0
export function update(){
    addSegments()
    const inputDirection = getInputDir()
    for(let i = snakeBody.length - 2; i >= 0; i--){ 
        snakeBody[i + 1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}
export function draw(gameBoard){ 
    snakeBody.forEach(seg => { 
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = seg.y
        snakeElement.style.gridColumnStart = seg.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function onSnake(pos, {ignoreHead = false} = {}){
    return snakeBody.some((seg, index) => {
        if (ignoreHead && index == 0) return false
        return ComparePosition(pos,seg)
    })
}

function ComparePosition(pos1,pos2){
    return pos1.x===pos2.x && pos1.y===pos2.y
}

export function expandSnake(rate){
    newSegments += rate
}

function addSegments(){ 
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
    newSegments = 0
}

export function getSnakeHead(){
    return snakeBody[0]
}
export function snakeIntersects(){ 
    return onSnake(snakeBody[0], {ignoreHead: true})
}
export function getSnakeLength(){ 
    return snakeBody.length
}