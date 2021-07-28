document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const button = document.querySelector('.move')
  const gridSize = 20
  const gridArray = []
  const shapes = [[29,28,9,8], [68,48,28,8],[48,28,9,8],[29,10,9,8], [49,29,28,8]]
  const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'red', 'magenta']
  const blocks = []

  // block class 
class Block {
  constructor() {
    this.positions = shapes[Math.floor(Math.random() * shapes.length)]
    this.color = colors[Math.floor(Math.random() * colors.length)]
    
  }
}

// create grid
  for (i=0; i < gridSize * gridSize; i++) { 
    div = document.createElement('div')
    div.classList = 'square'
    div.id = `${i}`
    grid.appendChild(div)
    gridArray.push(div)
  }

// create a new demo block
function createDemoBlock() {
  const block = new Block()
  blocks.push(block)
}

// draw the blocks on the grid
 function drawBlocks(blocks) {
   for (i=0; i<gridArray.length; i++) {
     gridArray[i].classList = 'square'
     for (block of blocks) { 
        for (el of block.positions) {
          if (el == i) {
            gridArray[i].classList = `square block ${block.color}`
          }
        }
     }    
   }
 }

// check if block hits ground 
 function checkHit(array) {
   for (item of array) {
       if (item > 380) {
         return true
       } else {
         return false
     }
   }
 }

// move the blocks down
 function moveBlocks() {
  if (!checkHit(block.positions)){
   blocks.map((block, blockIndex) => {
     block.positions.map((pos, posIndex) => {
       let newPos = pos += 20
       blocks[blockIndex].positions[posIndex] = newPos
     })
   })
  }
   drawBlocks(blocks)
 }

 button.addEventListener('click', moveBlocks)

createDemoBlock()
drawBlocks(blocks)



})