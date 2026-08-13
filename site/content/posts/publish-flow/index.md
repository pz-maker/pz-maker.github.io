---
title: 文章常态化发布流程
date: 2026-08-13
lastmod: 2026-08-13
categories:
  - 零碎想法
tags: [workflow, obsidian]
draft: false
description: ""
---

> 一句话记忆：在 `posts/` 下新建 → 写 → `Ctrl+Shift+S`，其余全自动。这篇是随手可翻的速查卡。

## 一图流

```
Obsidian 写文章 ──▶ Ctrl+Shift+S ──▶ GitHub Actions 自动构建 ──▶ 上线
   （唯一要做的）      （一键推送）          （不用管）          （约 1 分钟）
```

## 三种内容的发法

### ① 发新文章（最常用）

1. Obsidian 里进入 `site/content/posts/`，按 `Ctrl+N`
2. 输入标题回车——<mark class="va-hl">完事了</mark>。Templater 自动：
   - 建好 `posts/<标题>/index.md` 文件夹结构
   - 填好 frontmatter（日期自动、分类默认「技术文章」）
3. 直接写正文，需要时改一下 frontmatter 的分类

### ② 发周记

在 `site/content/posts/weekly/` 下新建 → 自动套周记模板（ISO 周号、`issue` 编号都自动算好）。

### ③ 发动态

`site/content/moments/` 下新建 `<日期>.md`，只写 `date` 字段 + 一句话。

## frontmatter 速查（模板已填好，通常只改分类）

```yaml
categories:
  - 技术文章    # 五选一：技术文章 / 精读 / 周记 / 知识地图 / 零碎想法
draft: false   # 改成 true = 下架（草稿，哪里都不显示）
pinned: true   # 可选：置顶
```

分类对应独立分类页（首页星图也按分类聚团），详见 [增删文章指南](/posts/howto/)。

## 正文三个常用写法

| 想要 | 写法 |
| --- | --- |
| 霓虹高亮 | `<mark class="va-hl">重点</mark>` |
| 任务清单 | `- [ ] 待办` / `- [x] 完成` |
| 链接站内文章（星图会连线） | `[文字](/posts/文章slug/)`，**必须绝对路径** |

图片：直接粘贴，和 `index.md` 放同一目录，用相对路径引用。

## 发布与验证

- [x] `Ctrl+Shift+S` 一键提交推送
- [ ] 等约 1 分钟 → <https://pz-maker.github.io/> 查看
- 没更新？去仓库 **Actions** 页看构建是否红了

## 改与删

| 场景 | 做法 |
| --- | --- |
| 改错别字 | 直接改 → `Ctrl+Shift+S` |
| 临时下架 | frontmatter 加 `draft: true` → 推送 |
| 彻底删除 | 删掉 `posts/<slug>/` 文件夹 → **记得清理其他文章里对它的链接** → 推送 |
| 本地预览（可选） | `site/` 目录下跑 `hugo server -D --port 1313` |

## 关联

- [增删文章指南](/posts/howto/)：frontmatter 全字段与写作约定
- [知识地图总览](/posts/knowledge-map/)：写什么——四阶段学习路线