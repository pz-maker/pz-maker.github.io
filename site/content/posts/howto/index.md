---
title: 增删文章指南categories:
  - 站点指南
lastmod: 2026-08-11
description: "加分项：新增学习路径文章时，在 `docs/path/index.md` 的进度表格里加一行；想给首页「最近更新」露脸，什么都不用做 —— 它会按日期自动收录。"
---

# 增删文章指南

本站是纯静态站点，所有文章都是 `docs/` 下的 Markdown 文件。增删一篇文章只需动文件，<mark class="va-hl">不需要懂 Vue</mark>。

## 一、新增文章（<mark class="va-hl">三步</mark>）

### 1. 复制模板

复制 [文章模板](/posts/template/) 到对应分区目录，改名为目标文件名：

| 分区 | 放哪 | 文件名例子 |
| --- | --- | --- |
| 周总结 | `docs/weekly/` | `2026-W34.md` |
| 阅读小记 | `docs/reading/` | `flash-attention.md` |
| 学习路径 | `docs/path/` | `05-eng-practice.md` |

### 2. 填写 frontmatter（文件顶部的 `---` 块）

```yaml
---
title: 文章标题            # 必填：列表 / 热力图显示用
date: 2026-08-10          # 必填：YYYY-MM-DD，缺失则不进入列表与热力图
status: doing             # 可选：仅学习路径用，doing | done | todo
tags: [cuda, kernel]      # 可选：显示在文章右侧 META 栏
draft: true               # 可选：填了 true 则文章不出现在任何列表（草稿）
comment: false            # 可选：填了 false 则关闭本页评论区
---
```

### 3. 写正文

按分区约定写（周总结四段式 / 阅读小记五段式 / 路径条目清单式），写完即生效。

> 加分项：新增学习路径文章时，在 `docs/path/index.md` 的进度表格里加一行；想给首页「最近更新」露脸，什么都不用做 —— 它会按日期自动收录。

## 二、删除文章（<mark class="va-hl">两步</mark>）

1. **删除文件**：删掉 `docs/` 下对应的 `.md` 文件。
2. **清理引用**：
   - 若在 `docs/.vitepress/config.ts` 的 `sidebar` 里登记过，删掉那一行；
   - 若歌曲在 `docs/.vitepress/data/playlist.ts` 里，删掉对应条目（文章删了但歌留着也没关系）。

## 三、常用修改

| 想做什么 | 改哪里 |
| --- | --- |
| 顶部导航 | `docs/.vitepress/config.ts` 的 `nav` 数组 |
| 侧边栏分组 | `docs/.vitepress/config.ts` 的 `sidebar` 对象 |
| 首页 Hero 文案 | `docs/.vitepress/components/HomeHero.vue` |
| 站点色板 / 玻璃卡片 / 微光网格 | `docs/.vitepress/theme/custom.css` |
| 歌单 | `docs/.vitepress/data/playlist.ts`（两步：音频文件放 `docs/public/music/`，数组加一行） |
| 评论区 | `docs/.vitepress/config.ts` 的 `giscus`（4 参数） |
| 站点标题 / 描述 | `docs/.vitepress/config.ts` 顶部 |

## 四、预览与构建

```bash
npm run dev      # 本地预览，改文件即时热更新
npm run build    # 构建到 docs/.vitepress/dist，用于部署
```

## 五、文字高亮语法

正文中可用 `<mark class="va-hl">文字</mark>` 划出霓虹荧光（排版装饰用），详见 [文字高亮演示](/posts/highlight-demo/)：

```md
<mark class="va-hl">KV Cache</mark> 是推理优化的核心。   ← 冷蓝荧光，默认
<span class="va-hl va-hl--magenta">品红</span>   ← 换色：品红 / va-hl--molten 熔橙
```
