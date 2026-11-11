# Agent Review Workbench (VS Code 扩展)

把轨迹标注工作台包成 VS Code 插件。

## 安装（本地）
1. 把整个 `vscode-extension` 文件夹放到任意位置
2. 装 `vsce`：`npm i -g @vscode/vsce`
3. 打包：`cd vscode-extension && vsce package`
4. VS Code 里 `Ctrl+Shift+P` → `Extensions: Install from VSIX...` → 选生成的 `.vsix`

## 使用
`Ctrl+Shift+P` → 输入「打开轨迹标注工作台」→ 回车。
之后加载轨迹/标注 JSON 即可。

## 结构
```
vscode-extension/
  package.json        扩展清单（命令、入口）
  extension.js        激活逻辑：创建 webview 并注入工作台 HTML
  media/              工作台本体（index.html + core + plugins）
```

## 说明
- 所有资源内联进 webview，不依赖 file://
- 插件版工作台与 `review-workbench/index.html` 同源