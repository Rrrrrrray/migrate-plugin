import base from './base.js'
import Cfg from './config.js'
import fs from 'node:fs'
import _ from 'lodash'
import sharp from 'sharp'
import common from '../../../lib/common/common.js'

export default class tarot extends base {
  constructor (e) {
    super(e)
    this.model = 'tarot'
    this.path = Cfg.getResPath(this.model)
    this.info = Cfg.getfileYaml(this.path, this.model)
  }

  async tarot () {
    let card = this.randomCards(this.info.cards)
    let msg = await this.getTextImg(card)
    return msg
  }

  async divine () {
    let formName = _.sample(_.keys(this.info.formations))
    let formation = this.info.formations[formName]
    await this.e.reply(`启用${formName}，正在洗牌中`)

    let num = formation.cards_num
    let cards = this.randomCards(this.info.cards, num)
    let represent = formation.representations
    if (formName === '圣三角牌阵') represent = _.sample(represent)

    let msg = []
    _.each(cards, async (v, k) => {
      if (v.is_cut && k === num - 1) msg.push(`切牌「${represent[k]}」\n`)
      else msg.push(`第${k + 1}张牌「${represent[k]}」\n`)
      msg.push(await this.getTextImg(v))
    })

    await common.makeForwardMsg(this.e, msg, '塔罗牌占卜结果')
  }

  pickTheme () {
    let themes = _.filter(fs.readdirSync(this.path, { withFileTypes: true }), f => f.isDirectory())
    this.path += _.sample(themes)
  }

  randomCards (cards, num = 1) {
    let subTypes = fs.readdirSync(this.path)
    let subset = _.filter(cards, v => subTypes.includes(v.type))
    return _.sampleSize(subset, num)
  }

  async getTextImg (card) {
    let path = `${this.path}/${card.type}/`
    let imgs = fs.readdirSync(path)
    path += _.filter(imgs, i => i.includes(card.pic))[0]

    let msg = []
    if (_.random(1, true) < 0.5) {
      msg.push(`回应是「${card.name_cn}正位」「${card.meaning.up}」\n`)
      msg.push(segment.image(`file://${path}`))
    } else {
      msg.push(`回应是「${card.name_cn}逆位」「${card.meaning.down}」\n`)
      let img = await sharp(path).flip().toBuffer().then(buffer => buffer.toString('base64'))
      msg.push(segment.image(`base64://${img}`))
    }

    return msg
  }
}
