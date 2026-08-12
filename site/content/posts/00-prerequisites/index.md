---
title: 00 前置基础
date: 2026-08-10
status: doing
tags: [basics, linux, python]
categories:
  - 学习路径
lastmod: 2026-08-12
description: "进入 CUDA / 分布式之前的地基：操作系统、编程语言、深度学习与数学基础。参考 AIInfraGuide「前置基础」模块（约 20 篇），逐项任务见 [学习任务清单](/posts/study-plan/)。"
---

# 00 前置基础

> 进入 CUDA / 分布式之前的<mark class="va-hl">地基</mark>：操作系统、编程语言、深度学习与数学基础。参考 AIInfraGuide「前置基础」模块（约 20 篇），逐项任务见 [学习任务清单](/posts/study-plan/)。本页清单从本地旧站「第零层」合并而来。

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
- [ ] 语言进阶：面向对象、装饰器、生成器、多进程/多线程
- [ ] 对象模型细节（引用 / 闭包 / 深浅拷贝）：见 [Python 学习笔记](/posts/python-notes/)

## 编程语言

- [ ] **C/C++**：CUDA 编程的宿主语言
  - [ ] 理解指针、内存管理、编译链接过程（不要求精通模板元编程）
  - [ ] 能读懂 C++ 项目代码
  - [ ] 能写简单的 C++ 函数并编译运行
- [ ] **Go 语言**：非常有必要学习

## 深度学习与数学基础

- [ ] 反向传播与自动微分（标量到张量）
- [ ] 常见算子形状推导：卷积、Attention、LayerNorm
- [ ] 线性代数速查：矩阵乘法、范数、特征分解
  - [ ] 对矩阵维度变换有直觉（如看到 `(B, S, H) x (H, V)` 能立刻知道结果是 `(B, S, V)`）
  - [ ] 注意：不需要证明定理
- [ ] 概率论速查：分布、期望、方差、信息论熵
  - [ ] Softmax 的概率解释、交叉熵损失的含义（Speculative Decoding 正确性证明的基础）
- [ ] 微积分（了解即可）：链式法则、梯度的含义（理解反向传播与梯度溢出的前提）

## Transformer 架构

> 大模型时代的"通用底座"，后续每一层都在围绕它做优化——CUDA 层优化它的算子、分布式层切分它的参数、推理层加速它的生成。

- [ ] **Self-Attention 机制**
  - [ ] 理解 Q、K、V 的含义与计算过程（`QK^T → scale → softmax → PV`）
  - [ ] 理解为什么 Attention 的计算复杂度是 $O(N^2)$（后续理解 FlashAttention 优化的前提）
- [ ] **前馈网络（FFN）**
  - [ ] 掌握两层线性变换 + 激活函数的结构
  - [ ] 理解其为模型参数的大头所在
- [ ] **位置编码**
  - [ ] 了解 Sinusoidal、RoPE 等编码方式
  - [ ] 理解为什么 Transformer 需要额外的位置信息
- [ ] **LayerNorm**
  - [ ] 区分 Pre-Norm vs Post-Norm
  - [ ] 理解为什么大模型普遍采用 Pre-Norm
- [ ] **完整前向过程**
  - [ ] 能从 token embedding 开始，逐步跟踪数据在一个 Transformer Block 中的流转（`Attention → Add & Norm → FFN → Add & Norm`）
  - [ ] 能说清每一步的输入输出维度

## PyTorch 框架

- [ ] **核心概念**：Tensor 操作、自动微分（autograd）、Module / Parameter 的组织方式
- [ ] **训练循环**：`DataLoader → forward → loss → backward → optimizer.step`
- [ ] **模型保存与加载**：`state_dict` 的使用、`checkpoint` 的使用
- [ ] **基本调试**
  - [ ] 使用 `torch.cuda.memory_summary()` 查看显存使用
  - [ ] 使用 `torch.profiler` 进行简单性能分析

## GPU 基本概念

- [ ] GPU vs CPU：并行模型差异、吞吐优先
- [ ] `nvidia-smi` 输出解读：显存、SM 占用、温度、功耗
- [ ] 异构编程的搬运成本：PCIe / NVLink 带宽量级

## 通信拓扑

> 分布式训练和多卡推理都离不开高效的卡间、机间通信。这是理解分布式并行策略的前提（例如：不理解 NVLink 与 PCIe 的带宽数量级差异，就无法理解"为什么张量并行不能跨机"）。

- [ ] **单机内部通信**
  - [ ] 理解 NVLink / NVSwitch 的带宽与拓扑
  - [ ] 理解 NVLink 作为同一机箱内 GPU 专用高速通道的角色
- [ ] **多机间通信**
  - [ ] 了解 InfiniBand（IB）网络与 RoCE 协议
  - [ ] 理解 IB 作为跨节点通信基础设施的特点（带宽低于 NVLink 但支持远距离连接）
- [ ] **集合通信原语**
  - [ ] 理解 AllReduce、AllGather、ReduceScatter 的含义与开销
  - [ ] 掌握通信量公式（分析并行策略开销的基础）
- [ ] **NCCL**
  - [ ] NVIDIA 集合通信库的基本用法
  - [ ] NCCL 调优方法

## 出口检查

能独立解释「一张 A100 上跑 7B 模型做 prefill，每 token 的算力与带宽需求」—— <mark class="va-hl">算力由 SM 决定，带宽由 HBM 决定</mark>，两者共同决定理论下限。

## 参考

- [AIInfraGuide 前置基础](https://caomaolufei.github.io/AIInfraGuide/)
- 配套任务：[学习任务清单 → 模块一](/posts/study-plan/)
- 相关笔记：[Python 学习笔记](/posts/python-notes/) ｜ [From Nand to Tetris 学习笔记](/posts/nand-to-tetris/)