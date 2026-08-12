---
title: 增删文章指南
date: 2026-08-10
lastmod: 2026-08-12
tags: [guide]
categories:
  - 零碎想法
description: "新增三步（Ctrl+N 自动模板 → 填 frontmatter → Ctrl+Shift+S 发布），删除两步（删文件夹 → 清理站内引用），全站 Hugo 静态站，文章即文件。"
---

# 增删文章指南

本站是 Hugo 静态站，所有文章都是 `site/content/posts/` 下的 Markdown 文件。增删一篇文章只需动文件，<mark class="va-hl">不需要懂代码</mark>。

## 一、新增文章（<mark class="va-hl">三步</mark>）

### 1. 新建笔记（自动套模板）

在 Obsidian 中进入 `site/content/posts/` 目录，`Ctrl+N` 新建笔记，输入标题回车：

- Templater 自动创建 `site/content/posts/<slug>/index.md`（每篇一个文件夹，附件同目录）
- frontmatter（标题 / 日期 / 分类）已自动填好，分类默认「技术文章」
- 在 `site/content/posts/weekly/` 下新建 = 周记模板（自动算 ISO 周号、写 `issue` 编号）

### 2. 填写 frontmatter（文件顶部的 `---` 块）

```yaml
---
title: 文章标题            # 必填：列表 / 星图显示用
date: 2026-08-10          # 必填：YYYY-MM-DD，缺失则不进入列表与星图
categories:
  - 技术文章              # 可选值：技术文章 / 精读 / 周记 / 知识地图 / 零碎想法（首页星图按此分组）
tags: [cuda, kernel]      # 可选：显示在文章右侧 META 栏
description: ""           # 可选：留空则卡片自动从正文截取摘要
draft: true               # 可选：填 true 则文章不出现在任何列表（草稿）
pinned: true              # 可选：填 true 则置顶（首页 / 分类列表顶部）
---
```

### 3. 写正文，一键发布

按分区约定写（周记四段式 / 知识地图清单式），写完 `Ctrl+Shift+S` 一键提交推送，约 1 分钟后上线。

> 想给首页「最近更新」露脸，什么都不用做——它按日期自动收录；想给首页知识星图加连线，在正文里链接到其他站内文章即可（见「站内链接 / 星图」）。

## 二、删除文章（<mark class="va-hl">两步</mark>）

1. **删文件夹**：删掉 `site/content/posts/<slug>/` 整个文件夹。
2. **清理引用**：检查其他文章里有没有指向它的站内链接（`/posts/<slug>/`），有则删掉。

## 三、常用修改

| 想做什么 | 改哪里 |
| --- | --- |
| 站点标题 / 导航 / 评论区 | `site/hugo.toml` |
| 配色 / 荧光高亮 / 知识树样式 | `site/assets/css/molten.scss` |
| 首页知识星图 | `site/layouts/partials/starmap.html`（数据）+ `site/assets/js/starmap.js`（力导向动画） |
| 归档知识树 | `site/layouts/archives/list.html` |
| 新文章 / 周记模板 | `site/_templates/新文章.md` / `新周记.md`（Templater 脚本） |
| 构建发布 | `.github/workflows/deploy.yml`（push 到 main 自动触发） |

## 四、本地预览与构建

```powershell
# 在 site 目录下
hugo server -D --port 1313   # 本地预览，改文件即时热更新 → http://localhost:1313
hugo --minify                # 构建到 site/public（CI 里也是这条命令）
```

## 五、文字高亮语法

正文中可用 `<mark class="va-hl">文字</mark>` 划出霓虹荧光（排版装饰用），详见 [文字高亮演示](/posts/highlight-demo/)：

```md
<mark class="va-hl">KV Cache</mark> 是推理优化的核心。        ← 冷蓝荧光，默认
<span class="va-hl va-hl--magenta">品红</span>                ← 换色：品红变体
<span class="va-hl va-hl--molten">熔橙</span>                 ← 换色：熔橙变体
```

> 注意：荧光是排版装饰，语义强调请用 `**加粗**`；`<mark>` 与文字之间不要留空格。