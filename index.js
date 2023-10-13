import fs from 'node:fs'
import { pluginVer } from './components/Changelog.js'

logger.info(`cv移植插件${pluginVer}初始化~~~`)

const files = fs.readdirSync('./plugins/mora-plugin/apps').filter(file => file.endsWith('.js'))
let ret = []

files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }