import YAML from 'yaml'
import fs from 'node:fs'
import { pluginPath } from '../components/Changelog.js'

/**
 * 配置文件
 */
class Cfg {
  constructor () {
    this.def = `${pluginPath}/config/default/`
    this.user = `${pluginPath}/config/user/`
  }

  /** 通用yaml读取 */
  getfileYaml (path, name) {
    let file = `${path}${name}.yaml`
    return fs.existsSync(file) ? YAML.parse(fs.readFileSync(file, 'utf8')) : {}
  }

  /** 设置读取 */
  getSetYaml (name, isCopy = false) {
    if (isCopy) this.defSetCopy(name)
    let setYaml = fs.existsSync(`${this.user + name}.yaml`) ? this.user : this.def
    return this.getfileYaml(setYaml, name)
  }

  /** 配置拷贝 */
  defSetCopy (name) {
    name += '.yaml'
    if (!fs.existsSync(this.user)) fs.mkdirSync(this.user)

    if (!fs.existsSync(this.user + name)) fs.copyFileSync(this.def + name, this.user + name)
  }
}

export default new Cfg()
