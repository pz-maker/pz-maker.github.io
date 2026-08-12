---
title: 阶段三 · 系统能力进阶（6~12 个月）
date: 2026-08-12
lastmod: 2026-08-12
tags: [roadmap, phase-3, distributed, cuda, performance, inference]
categories:
  - 知识地图
description: "6~12 个月｜Deadline 2027-08-12：分布式训练系统、CUDA、系统性能优化、推理优化、AI 编译器。"
---

# 阶段三 · 系统能力进阶

> **时间**：6 ~ 12 个月　**Deadline**：<mark class="va-hl">2027-08-12</mark>　**状态**：⏳ 未开始
> **输出**：每章学完在 [知识地图](/posts/knowledge-map/) 下更新进度，性能分析报告与优化代码存档本站。

## 3.1 分布式训练系统

**教材**：《分布式机器学习：算法、理论与实践》，刘铁岩、陈薇 等

**阅读范围**：
- 第 2 章：机器学习基础（复习，快速过）
- 第 3 章：分布式机器学习框架（精读，理解四大模块）
- 第 4 章：单点优化（选读）
- 第 5 章：数据并行与模型并行（精读）
- 第 6 章：通信机制（精读，AllReduce/AllGather/ReduceScatter）
- 第 7 章：聚合与同步（精读）
- 第 8 章：数据与模型并行之外的并行（流水线并行、混合并行，精读）

**深度要求**：掌握
- 能清晰解释数据并行、张量并行、流水线并行的原理和适用场景
- 理解参数服务器 vs All-Reduce 架构的优劣
- 理解通信拓扑（Ring-AllReduce、Tree-AllReduce）的带宽计算
- 能手画 3D 并行（DP+TP+PP）的通信流程图

**补充**：DeepSpeed / Megatron-LM / FSDP 官方文档与源码

**阅读范围**：
- DeepSpeed ZeRO-1/2/3 论文与源码（精读）
- Megatron-LM 张量并行实现（精读）
- FlashAttention v1/v2 论文（精读）

**深度要求**：精通
- 能解释 ZeRO-3 的参数、梯度、优化器状态分片机制
- 能计算给定模型和集群配置下的显存占用和通信量
- 理解 FlashAttention 的 IO-Aware 分块策略和复杂度分析

## 3.2 CUDA 与 GPU 编程

**教材**：《GPU 高性能编程 CUDA 实战》，Jason Sanders 等

**阅读范围**：
- 第 1~3 章：CUDA 简介、并行编程、C 扩展（精读）
- 第 4~5 章：常量内存、纹理内存（理解）
- 第 6 章：原子操作与并行规约（精读）
- 第 7 章：流与并发（精读）
- 第 8~9 章：多 GPU、CUDA 与图形学（选读）

**深度要求**：掌握
- 能独立编写矩阵乘法、向量归约等基础 CUDA Kernel
- 理解线程层次结构（Grid → Block → Thread）
- 理解共享内存、bank conflict、coalesced memory access
- 能使用 Nsight Compute 分析 Kernel 性能瓶颈

**补充教材**：《CUDA 并行编程与性能优化》，徐佳宁

**阅读范围**：
- 第 3~4 章：CUDA 编程模型与内存优化（精读）
- 第 5 章：线程同步与原子操作（精读）
- 第 6 章：多 GPU 编程（理解）
- 第 7~8 章：性能分析工具与实战案例（精读）

**深度要求**：掌握
- 能手写优化版矩阵乘法（Tiling + 共享内存）
- 理解 CUDA Stream 和 Event 的同步机制
- 能分析 occupancy、register pressure、shared memory 的 trade-off

**补充教材**：《CUDA 专家手册：GPU 编程权威指南》，Nicholas Wilt

**阅读范围**：
- 第 2~3 章：GPU 硬件架构（精读，SM、Warp、内存层次）
- 第 5~6 章：内存与流（精读）
- 第 8 章：多 GPU（理解）

**深度要求**：理解
- 理解 GPU 执行模型（SIMT、Warp Divergence）
- 理解 HBM 带宽与计算峰值的 Roofline Model
- 能根据 GPU 架构（如 A100/H100）估算理论峰值性能

## 3.3 系统性能优化

**教材**：《性能之巅：洞悉系统、企业与云计算》，Brendan Gregg

**阅读范围**：
- 第 2 章：方法（精读，USE 方法、RED 方法、Off-CPU 分析）
- 第 4~6 章：观测工具（精读，perf、Ftrace、BPF）
- 第 8~10 章：CPU、内存、文件系统性能（精读）
- 第 11~12 章：磁盘、网络性能（精读）
- 第 13~14 章：云计算、基准测试（选读）

**深度要求**：掌握
- 熟练使用 perf 进行 CPU 热点分析
- 熟练使用 BPF/BCC 进行动态追踪
- 能使用火焰图定位性能瓶颈
- 理解 CPU 缓存、分支预测、预取对程序性能的影响

**补充教材**：《现代 CPU 上的性能分析与优化》，Denis Bakhvalov（开源中文版）

**阅读范围**：
- 第 3~5 章：CPU 微架构、内存子系统、缓存优化（精读）
- 第 6~7 章：分支预测、向量化（精读）
- 第 8~9 章：编译器优化、性能分析实践（精读）

**深度要求**：理解
- 理解 False Sharing 的产生原因和解决方法
- 理解编译器自动向量化的条件
- 能使用 SIMD 指令（AVX2/AVX-512）优化热点代码

## 3.4 推理优化

**教材**：无专门书籍，以论文 + 开源项目文档为主

**阅读范围**：
- vLLM 论文 + 源码（PagedAttention 机制，精读）
- TensorRT-LLM 官方文档（精读）
- 《大规模语言模型：从理论到实践》第 7 章：模型压缩与高效推理（精读）
- AWQ / GPTQ / SmoothQuant 量化论文（理解）

**深度要求**：掌握
- 能解释 PagedAttention 如何解决 KV Cache 内存碎片化
- 能解释 Continuous Batching 的调度策略
- 理解 INT8/FP8/INT4 量化的原理和精度损失
- 能使用 vLLM 或 TensorRT-LLM 部署生产级推理服务
- 理解投机解码（Speculative Decoding）的基本原理

## 3.5 AI 编译器（选学）

**教材**：《TVM 编译器原理与实践》

**阅读范围**：
- 第 1~2 章：深度学习编译器概述（精读）
- 第 3~4 章：TVM 基础与算子编译（精读）
- 第 5~6 章：图优化与量化（理解）
- 第 7~8 章：自动调度与代码生成（理解）

**深度要求**：理解
- 理解计算图优化的基本 pass（算子融合、常量折叠、布局转换）
- 理解 TVM 的 Relay IR 和 TE 表达
- 能编写一个简单的 TVM 算子调度

## 验收标准

- [ ] 用 DeepSpeed ZeRO-3 训练一个 7B 参数模型，理解显存占用计算
- [ ] 手写 CUDA Kernel 实现矩阵乘法，性能达到 cuBLAS 的 60% 以上
- [ ] 用 vLLM 部署 Llama-3-8B，实现高并发推理，吞吐达到官方 benchmark 水平
- [ ] 使用 perf + BPF 定位一个真实服务的 CPU 性能瓶颈并优化
- [ ] 能向面试官解释 FlashAttention 的内存访问模式优化原理

---

[← 阶段二：AI 工程入门](/posts/km-phase-2/) · [路线总览](/posts/knowledge-map/) · [下一阶段：平台架构与前沿 →](/posts/km-phase-4/)