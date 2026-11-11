# 交接说明（HANDOFF）

> 会话上下文可能被压缩，这份文件记录当前状态，防止丢失。
> 更新时间：2026-11-11（v1.05）

## 一、现在有什么

### 1. 标注工具
- 本地：`上交实习\人工标注工具-通用版.html`（单文件，双击打开）
- 仓库：`ISOMER20070606/agent-review-workbench` → `tools/人工标注工具-通用版.html`
- 最新提交：`b153c2b`（理由模板 + severity 建议 + 一键无问题）

功能：
- 加载：单文件/多文件/文件夹（📁），自动配对
- 标注模式：判断 / 概览
- 审查模式：时间线 / 记忆 / 对比 AI
- 判断页：四维度、#K 填空、出错点、相似判例、理由模板、无问题
- 3 步引导（❓ 重开）

### 2. 标注数据（29 条）
- `上交实习\前批_标注\`（review_task2，15 条）
- `上交实习\新批3_标注\`（review_task3，14 条）
- `上交实习\标注源文件\`（轨迹+标注配对，29 对，含 README）

### 3. 记忆库（dreaming 产出）
- `上交实习\memory\`
  - `memory.json`（机器可读，13 个判例模式 + 判例）
  - `index.md` / `report.md` / `calibration.md`
  - `patterns/`（13 页）、`cases/`（29 页）
- 脚本：`上交实习\dreaming\dream.py`

### 4. 文档
- `桌面\汇报_今晚\`：会议发言稿（pdf/md）、新批标注手册（pdf/md）、018-01 示范标注、finding 来源说明

## 二、当前数据

- 29 条标注，116 条 findings，全部 resolved=false
- 评级分布：任务 fail 29；安全 warning 10；报告 warning 14 + fail 3；冗余 yes 29
- 记忆：13 个模式，0 无效步骤，6 证据弱，7 个口径冲突

## 三、怎么重跑 dreaming

```bash
python 上交实习\dreaming\dream.py
```
输出到 `上交实习\memory\`。需要 Python 3（DSH 自带或系统 Python 均可）。

## 三·五、插件形态（已完成）

- `review-workbench/`：文件夹插件版（index.html + core/ + plugins/）
  - 插件 API：`ReviewPlugins.register({id,title,render(el,ctx)})`
  - 已有插件：案例库 `plugins/cases.js`、校准 `plugins/calibration.js`
- `vscode-extension/`：VS Code 扩展（命令面板「打开轨迹标注工作台」）
  - 安装：`vsce package` → 安装 .vsix

## 四、下一步（未做）

1. **导入向导**：识别结果摘要（识别到 N 轨迹 / M 标注 / 配对 X 对）
2. ~~插件拆分~~（已完成：workbench/ + vscode-extension/）
3. **案例库**：5 个教学案例（144/177/73/161/115）
4. ~~JSONL 适配器~~（已完成：JSONL / 纯消息数组）
5. **校准日志**：记录「建议 vs 实际」差异，作为论文数据

## 五、怎么续上

新会话直接说：
> 读 `上交实习\HANDOFF.md`，继续做导入向导（或插件拆分）。

## 六、仓库提交记录（近期）

- `b153c2b` feat: reason templates, severity suggestion, one-click no-issue
- `2040230` feat: similar-case panel from memory library
- `dfcc1eb` feat: builtin memory + folder loading + load status
- `b97086a` feat: dreaming script
- `2494079` feat: intro guide, anno/review mode switch, memory panel
