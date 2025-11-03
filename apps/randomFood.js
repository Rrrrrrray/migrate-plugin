import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'
import _ from 'lodash'
/**
 * @author Rrrrrrray
 */
export class randomFood extends plugin {
  constructor () {
    super({
      name: '随机食物',
      dsc: '今天吃什么[游戏食物版]',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: '^#?(.*)吃(什么|啥)$',
          fnc: 'randomFood'
        }
      ]
    })
  }

  async randomFood () {
    let xy = './plugins/xiaoyao-cvs-plugin/resources/xiaoyao-plus/shiwu_tujian'
    let al = './plugins/Atlas/Genshin-Atlas/food'
    if (!fs.existsSync(al)) al = './plugins/atlas/Genshin-Atlas/food'
    if (!fs.existsSync(xy) && !fs.existsSync(al)) return false

    const xyfood = fs.readdirSync(xy).reduce((acc, v) => {
      if (v !== '.keep') acc.push(`${xy}/${v}`)
      return acc
    }, [])

    const alfood = fs.existsSync(al) ? fs.readdirSync(al).map(v => `${al}/${v}`) : []

    const food = xyfood.concat(alfood)

    await this.e.reply([`${this.e.bot.nickname}帮你选出这个捏，要试试看嘛?`, segment.image(`file://${_.sample(food)}`)])
    return true
  }
}
