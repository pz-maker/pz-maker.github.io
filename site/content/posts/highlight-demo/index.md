---
title: 文字高亮演示
date: 2026-08-10
tags: [guide, typography]
categories:
  - 零碎想法
lastmod: 2026-08-11
description: "引用的作用：本文档是 排版演示，语法说明见 [增删文章指南](/posts/howto/)。"
---

# 文字高亮演示

本站支持 `<mark class="va-hl">文字</mark>` 霓虹荧光高亮，起排版装饰作用（Obsidian 里直接写 HTML 标签即可，网站渲染为青蓝荧光）。

## 基础用法

直接写：`<mark class="va-hl">这样</mark>`，渲染效果 —— <mark class="va-hl">深色哑光底上的一道冷蓝荧光</mark>，像在笔记上划过一束微光。

- 短词强调：<mark class="va-hl">KV Cache</mark> 是推理优化的核心。
- 长句标记：<mark class="va-hl">Prefill 阶段吞吐优先，Decode 阶段延迟优先，二者共享同一批 GPU。</mark>
- 与行内代码混排：`torch.profiler` 的 <mark class="va-hl">export_chrome_trace</mark> 参数导出时间线。

## 三色变体

默认是冷蓝；需要换色时用 HTML 类换色：

- <span class="va-hl">青蓝 · 默认</span> —— 冷色，用于技术要点
- <span class="va-hl va-hl--magenta">品红 · 变体</span> —— 暖冷对冲，用于风险/警告
- <span class="va-hl va-hl--molten">熔橙 · 变体</span> —— 高温色，用于性能热点/当前焦点

## 排版组合示例

> 引用的作用：本文档是 <mark class="va-hl">排版演示</mark>，语法说明见 [增删文章指南](/posts/howto/)。

| 场景 | 示例 |
| --- | --- |
| 周总结 | 本周 <mark class="va-hl">完成了 FlashAttention 精读</mark>，下周计划 <mark class="va-hl">Triton 复现核心循环</mark> |
| 阅读小记 | 论文的 <mark class="va-hl">I/O 复杂度推导</mark> 是全文最精彩的部分 |
| 知识地图 | 目标：<mark class="va-hl">手写 GEMM 达到 cuBLAS 80% 性能</mark> |

代码块内的高亮由语法着色负责，与荧光笔互不干扰：

```python
# 荧光笔管排版，高亮由语法着色管
def tile_gemm(a, b):
    return a @ b  # <mark class="va-hl"> 这一行不会被高亮 </mark>
```

## 注意事项

- `<mark class="va-hl">` 与文字之间不要留空格：`</mark> 高亮 <mark class="va-hl">` 不会生效。
- 荧光是排版装饰，**不要用它表达语义强调**；语义强调继续用 `**加粗**`。
- 鼠标悬停在荧光文字上会轻微提亮（`prefers-reduced-motion` 下自动关闭）。
