import fs from 'node:fs'
import _ from 'lodash'

const _path = process.cwd()
const plugin = 'migrate-plugin'
const pluginPath = `${_path}/plugins/${plugin}`
const _logPath = `${pluginPath}/CHANGELOG.md`

let logs = {}
let changelogs = []
let pluginVer
let versionCount = 4

const getLine = function (line) {
  line = line.replace(/(^\s*\*|\r)/g, '')
  line = line.replace(/\s*`([^`]+`)/g, '<span class="cmd">$1')
  line = line.replace(/`\s*/g, '</span>')
  line = line.replace(/\s*\*\*([^\*]+\*\*)/g, '<span class="strong">$1')
  line = line.replace(/\*\*\s*/g, '</span>')
  line = line.replace(/ⁿᵉʷ/g, '<span class="new"></span>')
  return line
}

try {
  if (fs.existsSync(_logPath)) {
    logs = fs.readFileSync(_logPath, 'utf8') || ''
    logs = logs.split('\n')

    let temp = {}
    let lastLine = {}
    _.forEach(logs, (line) => {
      if (versionCount <= -1) return false
      let versionRet = /^#\s*([0-9\\.~\s]+?)\s*$/.exec(line)
      if (versionRet && versionRet[1]) {
        let v = versionRet[1].trim()
        if (!pluginVer) {
          pluginVer = v
        } else {
          changelogs.push(temp)
          if (/0\s*$/.test(v) && versionCount > 0) {
            versionCount = 0
          } else {
            versionCount--
          }
        }

        temp = {
          version: v,
          logs: []
        }
      } else {
        if (!line.trim()) return
        if (/^\*/.test(line)) {
          lastLine = {
            title: getLine(line),
            logs: []
          }
          temp.logs.push(lastLine)
        } else if (/^\s{3,}\*/.test(line)) {
          lastLine.logs.push(getLine(line))
        }
      }
    })
  }
} catch (e) {
  // do nth
}

export { pluginVer, changelogs, pluginPath }
