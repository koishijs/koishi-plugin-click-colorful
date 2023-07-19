export interface ClickOptions {
  enabled: boolean
  size: number
  count: number
  colors: string[]
}

function randomPick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

class Ball {
  constructor(public options: ClickOptions) {}

  fly(x: number, y: number, loopTimer = 300) {
    const ballElements: HTMLElement[] = []
    const fragment = document.createDocumentFragment()

    let loop = 0
    for (let i = 0; i < this.options.count; i++) {
      const curLoop = i / this.options.count
      const ball = document.createElement('i')
      ball.className = 'color-ball ball-loop-' + curLoop
      let blurX = Math.random() * 10
      if (Math.random() > 0.5) blurX = blurX * -1
      let blurY = Math.random() * 10
      if (Math.random() > 0.5) blurY = blurY * -1
      ball.style.left = (x - this.options.size) + 'px'
      ball.style.top = (y - this.options.size) + 'px'
      ball.style.width = (2 * this.options.size) + 'px'
      ball.style.height = (2 * this.options.size) + 'px'
      ball.style.position = 'fixed'
      ball.style.borderRadius = '1000px'
      ball.style.boxSizing = 'border-box'
      ball.style.zIndex = '9999'
      ball.style.opacity = '0'
      if (curLoop === 0) ball.style.opacity = '1'
      ball.style.transform = 'translate3d(0px, 0px, 0px) scale(1)'
      ball.style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(1)'
      ball.style.transition = 'transform 1s ' + curLoop * loopTimer / 1000 + 's ease-out'
      ball.style.webkitTransition = 'transform 1s ' + curLoop * loopTimer / 1000 + 's ease-out'
      ball.style.backgroundColor = randomPick(this.options.colors)
      fragment.appendChild(ball)
      ballElements.push(ball)
      setTimeout(function () {}, curLoop * loopTimer + 30)
      if (curLoop !== loop) {
        (function (num) {
          setTimeout(function () {
            const loopBalls = document.getElementsByClassName('ball-loop-' + num)
            for (let j = 0; j < loopBalls.length; j++) {
              loopBalls[j].style.opacity = 1
            }
            if (num === loop) {
              _clear(ballElements)
            }
          }, num * loopTimer + 30)
        })(curLoop)
        loop = curLoop
      }
    }

    document.body.appendChild(fragment)
    // 延迟删除
    _clear(ballElements)
    // 执行动画
    setTimeout(function () {
      for (let i = 0; i < ballElements.length; i++) {
        _run(ballElements[i])
      }
    }, 10)
  }
}

function _run(ball: HTMLElement) {
  const randomXFlag = Math.random() > 0.5
  const randomYFlag = Math.random() > 0.5
  let randomX = Math.random() * 160
  let randomY = Math.random() * 160
  if (randomXFlag) {
    randomX = randomX * -1
  }
  if (randomYFlag) {
    randomY = randomY * -1
  }
  const transform = 'translate3d(' + randomX + 'px,' + randomY + 'px, 0) scale(0)'
  ball.style.transform = transform
}

function _clear(balls: HTMLElement[]) {
  setTimeout(function () {
    for (const ball of balls) {
      ball.parentElement?.removeChild(ball)
    }
  }, 1000)
}

export { Ball }
