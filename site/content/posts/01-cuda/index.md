---
title: 01 CUDA 与算子优化
date: 2026-08-10
status: todo
tags: [cuda, kernel, triton]categories:
  - 学习路径
lastmod: 2026-08-11
description: "从编程模型到算子性能的关键路径：先懂 warp 与内存层次，再谈 tile 与融合。参考 AIInfraGuide「CUDA 编程」模块（约 23 篇），逐项任务见 [学习任务清单…"
---

# 01 CUDA 与算子优化

> 从编程模型到算子性能的<mark class="va-hl">关键路径</mark>：先懂 warp 与内存层次，再谈 tile 与融合。参考 AIInfraGuide「CUDA 编程」模块（约 23 篇），逐项任务见 [学习任务清单](/posts/study-plan/)。

## CUDA 编程模型

- [ ] 线程层次：thread / block / grid，warp 与 SIMT
- [ ] 内存层次：global / shared / register / constant，带宽量级
- [ ] 编译与执行：`nvcc` 流程、PTX / SASS、occupancy
- [ ] 同步与原子：`__syncthreads()`、atomicAdd、race 排查

## Kernel 优化基础

- [ ] 内存访问合并（coalescing）与 bank conflict
- [ ] 循环展开、向量化（`float4`）、grid-stride loop
- [ ] 共享内存 tile：矩阵乘法从 naive 到 tiled
- [ ] 指令级优化：ILP、FFMA 融合、避免分支发散

## 经典算子

- [ ] FlashAttention：I/O 感知的 attention 计算
- [ ] LayerNorm / Softmax 的数值稳定与 fused 实现
- [ ] 归约（reduction）与扫描（scan）模式
- [ ] 自定义算子工程：C++ 扩展、`torch.utils.cpp_extension`

## Triton

- [ ] Triton DSL：块级编程与自动 tile 调度
- [ ] 用 Triton 复现 FlashAttention 核心循环
- [ ] 性能对照：Triton vs 手写 CUDA vs cuBLAS

## 出口检查

能对着 Nsight Compute 的报告说出任意 kernel「<mark class="va-hl">为什么慢、瓶颈在哪、下一步改什么</mark>」。

## 参考

- [AIInfraGuide CUDA 编程](https://caomaolufei.github.io/AIInfraGuide/)
- [CUDA C++ Programming Guide](https://docs.nvidia.com/cuda/cuda-c-programming-guide/)
- 配套任务：[学习任务清单 → 模块二](/posts/study-plan/)
