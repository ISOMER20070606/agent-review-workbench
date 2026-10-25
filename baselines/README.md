# Baselines

46 条轨迹的**原始轨迹**（`*_trajectory.json`）和对应的 **GPT-6 标注**（`*_annotation.json`）。

- 工具加载方式：在「加载轨迹/标注 JSON」里同时选中同一编号的两个文件，会自动按 instance_id 配对。
- 原始轨迹格式：`messages` + `problem` + `generated_patch` + `evaluation`。
- 标注格式：4 维度 + `findings`（`step_id` / `rating` / `reason`）+ `run_review`。

## 索引

| 编号 | 任务 | 负责人 | bench | 说明 |
|---|---|---|---|---|
| 001 | 01_管理员邮箱验证工具 | tzm | swepro | `001_trajectory.json` / `001_annotation.json` |
| 009 | 02_系统保留标签权限 | sra | swepro | `009_trajectory.json` / `009_annotation.json` |
| 017 | 03_群组邀请HTTP接口 | xzy | swepro | `017_trajectory.json` / `017_annotation.json` |
| 025 | 04_并发发帖去重 | tzm | swepro | `025_trajectory.json` / `025_annotation.json` |
| 026 | 05_维护模式豁免群组 | cly | swepro | `026_trajectory.json` / `026_annotation.json` |
| 028 | 06_数据库对象字段选择 | cly | swepro | `028_trajectory.json` / `028_annotation.json` |
| 029 | 07_聊天与用户API校验 | zyt | swepro | `029_trajectory.json` / `029_annotation.json` |
| 037 | 08_WebFinger与well-known路由 | sra | swepro | `037_trajectory.json` / `037_annotation.json` |
| 038 | 09_上传文件路径标准化 | sra | swepro | `038_trajectory.json` / `038_annotation.json` |
| 042 | 10_数据库批量字段增减 | cly | swepro | `042_trajectory.json` / `042_annotation.json` |
| 043 | 11_头像与封面文件清理 | tzm | swepro | `043_trajectory.json` / `043_annotation.json` |
| 051 | 12_删帖清理上传文件 | zyt | swepro | `051_trajectory.json` / `051_annotation.json` |
| 059 | 13_后台上传错误响应 | xzy | swepro | `059_trajectory.json` / `059_annotation.json` |
| 062 | 14_邮箱确认过期与重发 | xzy | swepro | `062_trajectory.json` / `062_annotation.json` |
| 070 | 15_聊天允许名单与拒绝名单 | xzy | swepro | `070_trajectory.json` / `070_annotation.json` |
| 071 | 16_邀请token注册 | sra | swepro | `071_trajectory.json` / `071_annotation.json` |
| 072 | 17_与特权用户聊天的权限 | tzm | swepro | `072_trajectory.json` / `072_annotation.json` |
| 077 | 18_批量检查用户或群组 | zyt | swepro | `077_trajectory.json` / `077_annotation.json` |
| 080 | 19_主题反向链接 | zyt | swepro | `080_trajectory.json` / `080_annotation.json` |
| 081 | 20_权限类型与后台筛选 | cly | swepro | `081_trajectory.json` / `081_annotation.json` |
| 082 | 21_密码lookup重复运行修复 | tzm | swepro | `082_trajectory.json` / `082_annotation.json` |
| 083 | 22_multipart上传编码选择 | zyt | swepro | `083_trajectory.json` / `083_annotation.json` |
| 084 | 23_tags导致依赖role重复执行 | cly | swepro | `084_trajectory.json` / `084_annotation.json` |
| 085 | 24_实际可用CPU数量 | sra | swepro | `085_trajectory.json` / `085_annotation.json` |
| 086 | 25_adaptix_字段映射别名 | sra | deepswe | `086_trajectory.json` / `086_annotation.json` |
| 088 | 26_Bandit_区域与语句检查抑制 | zyt | deepswe | `088_trajectory.json` / `088_annotation.json` |
| 095 | 27_CSS_Tree_简写属性展开与压缩 | cly | deepswe | `095_trajectory.json` / `095_annotation.json` |
| 099 | 28_DynamoDB_Toolbox_递归schema | xzy | deepswe | `099_trajectory.json` / `099_annotation.json` |
| 100 | 29_Effect_HttpApi_SSE事件流 | tzm | deepswe | `100_trajectory.json` / `100_annotation.json` |
| 107 | 30_etree_XML差异与补丁 | zyt | deepswe | `107_trajectory.json` / `107_annotation.json` |
| 113 | 31_Expr_异常处理与重试 | zyt | deepswe | `113_trajectory.json` / `113_annotation.json` |
| 115 | 32_gql_GraphQL增量传输 | cly | deepswe | `115_trajectory.json` / `115_annotation.json` |
| 123 | 33_Happy_DOM_交叉观察器 | cly | deepswe | `123_trajectory.json` / `123_annotation.json` |
| 130 | 34_HTTPX_multipart响应解析 | sra | deepswe | `130_trajectory.json` / `130_annotation.json` |
| 134 | 35_igel_特征schema持久化 | tzm | deepswe | `134_trajectory.json` / `134_annotation.json` |
| 137 | 36_Ink_Grid网格布局 | zyt | deepswe | `137_trajectory.json` / `137_annotation.json` |
| 142 | 37_IPython_会话录制与回放 | xzy | deepswe | `142_trajectory.json` / `142_annotation.json` |
| 143 | 38_Kombu_死信队列与TTL | xzy | deepswe | `143_trajectory.json` / `143_annotation.json` |
| 149 | 39_Koota_延迟实体修改 | sra | deepswe | `149_trajectory.json` / `149_annotation.json` |
| 151 | 40_Koota_关系对变化追踪 | tzm | deepswe | `151_trajectory.json` / `151_annotation.json` |
| 152 | 41_LangChain_并发请求合并 | xzy | deepswe | `152_trajectory.json` / `152_annotation.json` |
| 155 | 42_Mashumaro_嵌套字段扁平化 | cly | deepswe | `155_trajectory.json` / `155_annotation.json` |
| 156 | 43_Meriyah_using资源声明 | cly | deepswe | `156_trajectory.json` / `156_annotation.json` |
| 159 | 44_Obsidian_Linter_自动目录 | sra | deepswe | `159_trajectory.json` / `159_annotation.json` |
| 163 | 45_OneDump_导出加密流水线 | tzm | deepswe | `163_trajectory.json` / `163_annotation.json` |
| 164 | 46_OPA_Rego规则执行统计 | xzy | deepswe | `164_trajectory.json` / `164_annotation.json` |
