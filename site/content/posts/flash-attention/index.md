---
title: FlashAttention 精读笔记
date: 2026-08-08

status: reading
tags: [attention, kernel, cuda]
categories:
  - 精读
lastmod: 2026-08-11
description: "一句话总结：把 attention 的中间矩阵拆成 tile，全程驻留 SRAM，把 O(N²) 显存占用降到 O(N)，并利用重计算实现精确而非近似的 attention。"
---

# FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness

> 一句话总结：把 attention 的中间矩阵拆成 tile，全程驻留 SRAM，把 <mark class="va-hl">O(N²) 显存占用降到 O(N)</mark>，并利用重计算实现精确而非近似的 attention。

## 背景与动机

- 标准 attention 需要把 S = QKᵀ 写回 HBM 再读回来做 softmax，<mark class="va-hl">N² 级别的显存与访存</mark>成为长序列瓶颈。
- 目标：在不改结果（exact）的前提下减少 HBM 往返 —— 让 HBM 访问次数 O(N²) → O(N²·M⁻¹·d)，其中 M 是 SRAM 大小。

## 核心方法

1. **分块（tiling）**：Q/K/V 切块，每块在 SRAM 内完成 QKᵀ → softmax → PV。
2. **Online softmax**：维护运行最大值 m 与归一化项 l，向后兼容已计算块。
3. **重计算（recompute）**：反向传播不存 S/P 中间量，重新前向一次换取显存。

## 亮点 / 疑点

- 亮点：复杂度推导干净（HBM 访问量公式），工程上 FlashAttention-2 又砍掉<mark class="va-hl">一半非矩阵乘法开销</mark>。
- 疑点：online softmax 的数值误差界需要补一个具体例子验证。

## 与知识地图的关联

- 对应 [学习路线](/posts/knowledge-map/) 中 CUDA 算子优化阶段，计划用 Triton 复现核心循环。
