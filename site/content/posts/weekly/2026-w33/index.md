---
title: 2026-W33 周总结
date: 2026-08-09
tags: [weekly, linux, cuda]
categories:
  - 周记
lastmod: 2026-08-11
---

# W33 · 周总结

## 本周完成

- [x] 搭建本 Wiki 站点（VitePress 壳层 + 全局鼠标 + 本地歌单播放器）
- [x] 技术文章 [00 前置基础](/posts/00-prerequisites/)：Linux 进程与作业控制（`tmux` / `nohup`）
- [x] 阅读《FlashAttention》论文前半部分，记录 <mark class="va-hl">I/O 复杂度推导</mark>

## 卡点与思考

- GPU <mark class="va-hl">显存带宽量级</mark>记不住，做题总差一个数量级 —— 下周做一张「带宽速查表」挂到 00 文章里。
- FlashAttention 的 <mark class="va-hl">online softmax</mark> 部分还没完全吃透，需要补一个数值例子。

## 下周计划

- [ ] 完成 [00 前置基础](/posts/00-prerequisites/)「GPU 基本概念」小节
- [ ] 精读 FlashAttention，并输出[阅读小记](/posts/flash-attention/)
- [ ] 动手：用 [04 性能分析](/posts/04-profiling/) 的 `torch.profiler` 分析一个简单模型的 kernel 时间分布

## 路径进度

- [00 前置基础](/posts/00-prerequisites/)：`doing`
- [01 CUDA 与算子优化](/posts/01-cuda/)：`todo`
