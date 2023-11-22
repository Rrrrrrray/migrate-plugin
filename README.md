# 仅自用学习代码

##### 安装
```git
git clone --depth=1 https://github.com/Rrrrrrray/migrate-plugin ./plugins/migrate-plugin/
```
##### 插件目录下依次执行
```
pnpm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
pnpm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
pnpm install --filter=migrate-plugin
```
# 感谢开源
- [Tarot 塔罗](https://github.com/MinatoAquaCrews/nonebot_plugin_tarot)