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

    let xyfood = _.filter(fs.readdirSync(xy), v => v !== '.keep')
    let alfood = fs.readdirSync(al)

    let food = _.concat(_.map(xyfood, v => `${xy}/${v}`), _.map(alfood, v => `${al}/${v}`))

    await this.e.reply(segment.image(`file://${_.sample(food)}`))
  }
}
