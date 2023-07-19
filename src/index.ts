import { Context, Schema } from 'koishi'
import { DataService } from '@koishijs/plugin-console'
import { resolve } from 'path'

declare module '@koishijs/plugin-console' {
  namespace Console {
    interface Services {
      colorful: Colorful
    }
  }
}

export interface Config {}

export default class Colorful extends DataService<{}> {
  static schema: Schema<Config> = Schema.object({})

  constructor(ctx: Context) {
    super(ctx, 'colorful')

    ctx.console.addEntry(process.env.KOISHI_BASE ? [
      process.env.KOISHI_BASE + '/dist/index.js',
      process.env.KOISHI_BASE + '/dist/style.css',
    ] : process.env.KOISHI_ENV === 'browser' ? [
      // @ts-ignore
      import.meta.url.replace(/\/src\/[^/]+$/, '/client/index.ts'),
    ] : {
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
  }

  async get() {
    return {}
  }
}
