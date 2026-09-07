---
title: 2026-W33 周总结
date: 2026-08-09
tags: [weekly, obsidian, workflow]
categories:
  - 周记
lastmod: 2026-08-13
---

# W33 · 周总结

本周只做了一件事：把 **Obsidian 写笔记 → Wiki 上线** 这条工作流搭通。工具链理顺之后，以后所有沉淀都能低成本发出来。

## 本周完成

- [x] 打通发布链路：Obsidian 写作 → `Ctrl+Shift+S` 一键推送 → GitHub Actions 自动构建 → <mark class="va-hl">约 1 分钟上线</mark>
- [x] Obsidian vault 与 Hugo 站点内容合一，笔记直接写在 `site/content/posts/`，无需搬运
- [x] 配置 Templater 新建模板：`Ctrl+N` 自动建好文件夹结构、填好 frontmatter（日期、分类默认值）
- [x] 本地预览：`hugo server` 热重载，所见即所得，确认无误再推送

## 卡点与思考

- Obsidian 的 `[[wiki 链接]]` Hugo 不认，站内引用一律要用标准 Markdown 链接 `[标题](/posts/xxx/)`，否则线上是死链
- 图片放文章同名文件夹（page bundle），相对路径引用，本地预览和线上渲染才能一致

## 下周计划

- [ ] 按知识地图开始系统学习，从前置检查清单逐项过
- [ ] 用这条工作流发出第一篇手敲的技术文章

> 相关：[文章常态化发布流程](/posts/publish-flow/)