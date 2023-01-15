import { Context } from '@koishijs/client'
import { Ball } from './ball'

export default (ctx: Context) => {
  function playColor(e: MouseEvent) {
    const color = new Ball()
    color.fly(e.clientX, e.clientY)
  }
  function toucuPlayColor(e: TouchEvent) {
    const color = new Ball()
    color.fly(e.changedTouches[0].clientX,e.changedTouches[0].clientY)
    e.stopPropagation()
    e.preventDefault()
  }
  addEventListener('click', playColor)
  addEventListener('touchstart', toucuPlayColor)
  ctx.on('dispose', () => {
    removeEventListener('click', playColor)
    removeEventListener('touchstart', toucuPlayColor)
  })
}
