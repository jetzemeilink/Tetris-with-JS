document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const button = document.querySelector('.move')
  const gridSize = 20
  const gridArray = []
  const colors = ['cyan', 'blue', 'orange', 'yellow', 'green', 'red', 'magenta']
  const blocks = []
  let activeBlock = null
  let speed = 200
  let score = 0

  // block class
  class Block {
    constructor(positions, shapeTypes) {
      this.positions = positions
      this.color = colors[Math.floor(Math.random() * colors.length)]
      this.shapeTypes = shapeTypes
      this.rotatePos = 0
    }

    moveDown() {
      if (!this.checkHit('down')) {
        this.positions.forEach((item, index) => {
          let newPos = (item += gridSize)
          this.positions[index] = newPos
          this.drawBlock('down')
        })
      }
      if (this.checkHit('down')) {
        convertActiveBlock()
      }
    }

    drawBlock(direction = 0) {
      const directions = {
        down: -20,
        right: -1,
        left: 1,
      }
      this.positions.forEach(item => {
        gridArray[item + directions[direction]]?.classList.remove('block')
        gridArray[item + directions[direction]]?.classList.remove(this.color)
      })
      this.positions.forEach(item => {
        gridArray[item].classList.add('block')
        gridArray[item].classList.add(this.color)
      })
    }

    checkHit(type) {
      for (let item of this.positions) {
        const hitTypes = {
          down:
            item >= 380 ||
            gridArray[item + 20]?.classList.contains('fixed-block'),
          right:
            (item + 1) % 20 == 0 ||
            gridArray[item + 1]?.classList.contains('fixed-block'),
          left:
            item % 20 == 0 ||
            gridArray[item - 1]?.classList.contains('fixed-block'),
        }
        if (hitTypes[type]) {
          return true
        }
      }
    }

    rotate() {
      if (!this.checkHit('left') && !this.checkHit('right') && !this.checkHit('down'))
       {
        this.positions.forEach((item, index) => {
          gridArray[item].classList.remove('block')
          gridArray[item].classList.remove(this.color)
          this.positions[index] = this.positions[0] + this.shapeTypes[this.rotatePos][index]
        })
        this.rotatePos < 3 ? this.rotatePos += 1 : this.rotatePos = 0
       }
    }
  }

  // create grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    div = document.createElement('div')
    div.classList = 'square'
    div.id = `${i}`
    grid.appendChild(div)
    gridArray.push(div)
  }

  // create a new block
  function createNewBlock() {
    // why does the array change after creating a new block???
    const shapeTypes = [
      [
          [0, -2, -1, +1],
          [0, -(gridSize*2), -gridSize, +gridSize],
          [0, -2, -1, +1],
          [0, -(gridSize*2), -gridSize, +gridSize]
      ],
      [
        [0, -(gridSize)-1, -gridSize, -1],
        [0, -(gridSize)-1, -gridSize, -1],
        [0, -(gridSize)-1, -gridSize, -1],
        [0, -(gridSize)-1, -gridSize, -1],
      ],
        [
        [0, -gridSize, +gridSize, +(gridSize-1)],
        [0, -(gridSize-1), -1, +1],
        [0, -gridSize, -(gridSize+1), +gridSize],
        [0, -1, +1, +(gridSize+1)]
       ],
       [
        [0, -gridSize, +gridSize, -(gridSize-1)],
        [0, -(gridSize+1), -1, +1],
        [0, -gridSize, +(gridSize+1), +gridSize],
        [0, -1, +1, +(gridSize-1)]
       ],
       [
        [0, +1, -gridSize, +(gridSize+1)],
        [0, +1, +gridSize, +(gridSize-1)],
        [0, +1, -gridSize, +(gridSize+1)],
        [0, +1, +gridSize, +(gridSize-1)]
       ],
       [
          [0, -gridSize, -1, +gridSize],
          [0, -gridSize, -1, +1],
          [0, -gridSize, +1, +gridSize],
          [0, -1, +1, +gridSize]
       ],
       [
        [0, +1, -(gridSize)+1, +gridSize],
        [0, -1, +gridSize, +(gridSize+1)],
        [0, +1, -gridSize, +(gridSize+1)],
        [0, -1, +gridSize, +(gridSize+1)]
       ]
    ]
    const shapes = [
      [48, 8, 28, 68],
      [29, 28, 9, 8],
      [9, 8, 10, 30],
      [9, 8, 10, 28],
      [8, 9, 27, 28],
      [9, 8, 10, 29],
      [9, 8, 29, 30]
    ]
    let randomInt = Math.floor(Math.random() * shapes.length)
    const block = new Block(shapes[randomInt], shapeTypes[randomInt])
    activeBlock = block
  }

  // convert active block to fixed
  function convertActiveBlock() {
    for (let item of activeBlock.positions) {
      gridArray[item].classList.remove('block')
      gridArray[item].classList.add('fixed-block')
    }
    blocks.push(activeBlock)
    activeBlock = null
    score += 50
    createNewBlock()
  }

  //  handle move blocks
  function handleMove(e) {
    switch (e.code) {
      case 'ArrowLeft':
        if (!activeBlock.checkHit('left')) {
          activeBlock.positions.forEach((item, index) => {
            let newPos = (item -= 1)
            activeBlock.positions[index] = newPos
            activeBlock.drawBlock('left')
          })
        }
        break
      case 'ArrowRight':
        if (!activeBlock.checkHit('right')) {
          activeBlock.positions.forEach((item, index) => {
            let newPos = (item += 1)
            activeBlock.positions[index] = newPos
            activeBlock.drawBlock('right')
          })
        }
        break
    }
  }

  // check if one of the lines is full
  // function checkLines() {
  //   let rowsCounter = []
  //  for (let i = 0; i<gridArray.length; i++) {
  //     let counter = 0
  //     if (gridArray[i].classList.contains('fixed-block')) {
  //       counter += 1
  //     }
  //     if (i % gridSize == 0) {
  //       rowsCounter.push([i-gridSize, counter])
  //       counter = 0
  //     }
      
  //  }
  //  rowsCounter = []
  // }

  // update the score
  function updateScore() {
    const scoreDisplay = document.querySelector('#score')
    scoreDisplay.innerHTML = score
  }

  // game main

  setInterval(() => {
    activeBlock?.moveDown()
    // checkLines()
    updateScore()
  }, speed)

  document.addEventListener('keyup', handleMove)
  document.addEventListener('keyup', e => {
    if (e.code === 'ArrowUp') {
      activeBlock.rotate()
    }
  })
  button.addEventListener('click', createNewBlock)
})
