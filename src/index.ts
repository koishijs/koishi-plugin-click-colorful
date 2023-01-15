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

    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
  }

  async get() {
    return {}
  }
}
