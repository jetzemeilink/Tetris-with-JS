document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const button = document.querySelector('.move')
  const gridSize = 20
  const gridArray = []
  const shapes = [[29,28,9,8], [68,48,28,8],[48,28,9,8],[29,10,9,8], [49,29,28,8]]
  const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'red', 'magenta']
  const blocks = []
  let activeBlock = null
  const speed = 300

  // block class 
class Block {
  constructor() {
    this.positions = shapes[Math.floor(Math.random() * shapes.length)]
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  moveDown() {
    if (!this.checkHit('down')){
    this.positions.forEach((item, index) => {
        let newPos = item += gridSize
        this.positions[index] = newPos
    }
    )
    this.drawBlock('down')
  }
  }

  drawBlock(direction=0) {
    const directions = {
      'down': -20,
      'right': -1,
      'left': 1
    }
    this.positions.forEach(item => {
      gridArray[item+directions[direction]]?.classList.remove('block') 
      gridArray[item+directions[direction]]?.classList.remove(this.color) 

    })
    this.positions.forEach(item => {
      gridArray[item].classList.add('block')
      gridArray[item].classList.add(this.color)

    })
  }

  checkHit(type) {
    for (let item of this.positions) { 
      const hitTypes = {
        'down': item > 380 || gridArray[item+20].classList.contains('fixed-block'),
        'right': (item +1) % 20 == 0,
        'left': item % 20 == 0
      }
      if (hitTypes[type]) {
        if (type === 'down') {
          convertActiveBlock()
          return true

        }
        return true 
    }}
   
  }

}

// create grid
  for (let i=0; i < gridSize * gridSize; i++) { 
    div = document.createElement('div')
    div.classList = 'square'
    div.id = `${i}`
    grid.appendChild(div)
    gridArray.push(div)
  }

// create a new demo block
function createNewBlock() {
  const block = new Block()
  console.log(block.positions)
  activeBlock = block
}

// convert active block to fixed
function convertActiveBlock() {
    for (let item of activeBlock.positions) {
    gridArray[item].classList.remove('block')
    gridArray[item].classList.add('fixed-block')
    }
    blocks.push(activeBlock)
    createNewBlock()
}

// draw all fixed blocks
function drawFixedBlocks() {
  if (blocks.length > 0) {
    blocks.forEach(block => {
      block.drawBlock()
    })
  }
  
}

//  handle move blocks
function handleMove(e) {
  switch(e.code) {
    case 'ArrowLeft':
      if (!activeBlock.checkHit('left')) {
        activeBlock.positions.forEach((item, index) => {
          let newPos = item -= 1
          activeBlock.positions[index] = newPos
          activeBlock.drawBlock('left')
        })
      }
      break
    case 'ArrowRight':
      if (!activeBlock.checkHit('right')) {
        activeBlock.positions.forEach((item, index) => {
          let newPos = item += 1
          activeBlock.positions[index] = newPos
          activeBlock.drawBlock('right')
        })
      }
      break
  }
 }



// game main

setInterval(() => {
  activeBlock.moveDown()
  drawFixedBlocks()
}, speed)
    


 document.addEventListener('keyup', handleMove)
 button.addEventListener('click', createNewBlock)



//  ouwe hit array
// checkHit(type) {
//   let hitArray = this.positions.filter(item => { 

//     const hitTypes = {
//       'down': item > 380 || gridArray[item+20].classList.contains('fixed-block'),
//       'right': (item +1) % 20 == 0,
//       'left': item % 20 == 0
//     }
//     if (hitTypes[type]) {
//       if (type === 'down') {
//         console.log('down')
//         gridArray[item].classList.remove('block')
//         gridArray[item].classList.add('fixed-block')
//         blocks.push(activeBlock)
//         createNewBlock()
//       }
//       return true 
//   }})
//   if (hitArray.length > 0) {
//     return true
//   } else {
//     return false
//   }
// }




})