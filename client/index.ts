import { Context, Schema, useConfig } from '@koishijs/client'
import { Ball } from './ball'

declare module '@koishijs/client' {
  interface Config {
    click: {
      enabled: boolean
      size: number
    }
  }
}

export default (ctx: Context) => {
  ctx.settings({
    id: 'click',
    title: '点击特效',
    schema: Schema.object({
      click: Schema.object({
        enabled: Schema.boolean().description('启用点击特效。').default(true),
        size: Schema.number().description('形状大小。').min(0).step(1).default(15),
        count: Schema.number().description('形状数量。').min(0).max(50).step(1).default(30),
        colors: Schema.array(Schema.string().required().role('color')).description('形状颜色。').default(['#eb125f', '#6eff8a', '#6386ff', '#f9f383']),
      }).description('点击特效'),
    }),
  })

  const config = useConfig()

  function handleClick(e: MouseEvent) {
    if (config.value.click?.enabled === false) return
    const color = new Ball({
      size: 15,
      count: 30,
      colors: ['#eb125f', '#6eff8a', '#6386ff', '#f9f383'],
      ...config.value.click,
    })
    color.fly(e.clientX, e.clientY)
  }

  function handleTouch(e: TouchEvent) {
    if (config.value.click?.enabled === false) return
    const color = new Ball({
      size: 15,
      count: 30,
      colors: ['#eb125f', '#6eff8a', '#6386ff', '#f9f383'],
      ...config.value.click,
    })
    color.fly(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
    e.stopPropagation()
    e.preventDefault()
  }

  addEventListener('click', handleClick)
  addEventListener('touchstart', handleTouch)
  ctx.on('dispose', () => {
    removeEventListener('click', handleClick)
    removeEventListener('touchstart', handleTouch)
  })
}
