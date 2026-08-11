---
title: 00 前置基础
date: 2026-08-10
status: doing
tags: [basics, linux, python]categories:
  - 学习路径
lastmod: 2026-08-11
description: "进入 CUDA / 分布式之前的地基：操作系统、编程语言、深度学习与数学基础。参考 AIInfraGuide「前置基础」模块（约 20 篇），逐项任务见 [学习任务清单](/pos…"
---

# 00 前置基础

> 进入 CUDA / 分布式之前的<mark class="va-hl">地基</mark>：操作系统、编程语言、深度学习与数学基础。参考 AIInfraGuide「前置基础」模块（约 20 篇），逐项任务见 [学习任务清单](/posts/study-plan/)。

## Linux 与命令行

- [ ] 文件系统、权限、进程与作业控制（`ps` / `top` / `nohup` / `tmux`）
- [ ] Shell 脚本：变量、循环、管道、`xargs`
- [ ] 环境管理：`conda` / `venv`、`LD_LIBRARY_PATH`、`PATH` 排查
- [ ] 常用工具：`nvidia-smi`、`lspci`、`htop`、`nvtop`

## Python 与工具链

- [ ] 虚拟环境与依赖锁定（`pip freeze` / `requirements.txt`）
- [ ] `numpy` 广播语义与内存布局（C-contiguous vs F-contiguous）
- [ ] 调试：`pdb`、`py-spy`、`faulthandler`
- [ ] 性能基础：`timeit`、`cProfile`、GIL 的影响边界

## 深度学习与数学基础

- [ ] 反向传播与自动微分（标量到张量）
- [ ] 常见算子形状推导：卷积、Attention、LayerNorm
- [ ] 线性代数速查：矩阵乘法、范数、特征分解
- [ ] 概率论速查：分布、期望、方差、信息论熵

## GPU 基本概念

- [ ] GPU vs CPU：并行模型差异、吞吐优先
- [ ] `nvidia-smi` 输出解读：显存、SM 占用、温度、功耗
- [ ] 异构编程的搬运成本：PCIe / NVLink 带宽量级

## 出口检查

能独立解释「一张 A100 上跑 7B 模型做 prefill，每 token 的算力与带宽需求」—— <mark class="va-hl">算力由 SM 决定，带宽由 HBM 决定</mark>，两者共同决定理论下限。

## 参考

- [AIInfraGuide 前置基础](https://caomaolufei.github.io/AIInfraGuide/)
- 配套任务：[学习任务清单 → 模块一](/posts/study-plan/)
