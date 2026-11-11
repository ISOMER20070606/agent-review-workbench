# 轨迹标注工作台 · 插件版

## 结构
```
review-workbench/
  index.html          启动页（双击打开）
  core/
    app.css           样式
    app.js            主程序（解析 / 状态 / 判断 / 概览 / 时间线 / 记忆）
  plugins/
    cases.js          案例库插件（示例）
```

## 加一个插件
1. 新建 `plugins/your-plugin.js`
2. 写：
```js
(function(){
  ReviewPlugins.register({
    id: 'your-id',
    title: '你的标签',
    render: function(el, ctx){
      // ctx.traj() 当前轨迹 / ctx.state() 当前判断 / ctx.dims 四维度
      el.innerHTML = '<div>hello</div>';
    }
  });
})();
```
3. 在 `index.html` 里加一行 `<script src="plugins/your-plugin.js"></script>`

## 和单文件版的关系
- `人工标注工具-通用版.html`：轻量版，发群里/双击用
- `review-workbench/`：插件版，加功能用
- 两边共享同一套 core 代码（拆分自单文件）