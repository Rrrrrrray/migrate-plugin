import plugin from '../../../lib/plugins/plugin.js'
import Tarot from '../model/tarot.js'

/**
 * 移植自：https://github.com/MinatoAquaCrews/nonebot_plugin_tarot
 */
export class tarot extends plugin {
  constructor () {
    super({
      name: '塔罗牌',
      dsc: '塔罗牌[NB移植版]',
      event: 'message',
      priority: 5,
      rule: [
        {
          reg: '^#?(占卜|塔罗牌)(帮助)?$',
          fnc: 'tarot'
        }
      ]
    })
  }

  async tarot () {
    let version = 'v0.4.0.post4'
    if (this.e.msg.includes('帮助')) {
      await this.e.reply(`塔罗牌 ${version}\n[占卜] 随机选取牌阵进行占卜\n[塔罗牌] 得到单张塔罗牌回应`)
      return true
    }

    let msg = new Tarot(this.e)
    if (this.e.msg.includes('占卜')) msg = await msg.divine()
    if (this.e.msg.includes('塔罗牌')) msg = await msg.tarot()

    if (!msg) return false
    await this.e.reply(msg)
    return true
  }
}
