---
title: 02 分布式训练
date: 2026-08-10
status: todo
tags: [distributed, nccl, megatron]categories:
  - 技术文章
lastmod: 2026-08-11
description: "单卡到千卡：并行策略、通信与框架实践。核心是算清显存账本与通信账本。参考 AIInfraGuide「分布式训练」模块（约 17 篇），逐项任务见 [学习任务清单](/posts/s…"
---

# 02 分布式训练

> 单卡到千卡：并行策略、通信与框架实践。核心是算清<mark class="va-hl">显存账本与通信账本</mark>。参考 AIInfraGuide「分布式训练」模块（约 17 篇），逐项任务见 [AI Infra 学习路线](/posts/knowledge-map/)。

## 并行策略

- [ ] 数据并行：DDP 梯度同步与通信量
- [ ] 模型并行：张量并行（Megatron 式切分）与流水线并行（1F1B / interleaved）
- [ ] 显存优化：ZeRO 1/2/3、FSDP 分片语义
- [ ] 序列并行、上下文并行、专家并行（MoE）概览

## 通信基础

- [ ] 集合通信原语：all-reduce / all-gather / reduce-scatter / p2p
- [ ] NCCL：拓扑感知、ring / tree 算法、环境变量调优
- [ ] 通信与计算重叠：bucket 分块、梯度异步
- [ ] 网络设施：IB / RoCE、PCIe / NVLink 带宽核算

## 框架实践

- [ ] PyTorch DDP 最小示例与坑点（`torchrun`、随机种子、eval 模式）
- [ ] DeepSpeed：ZeRO 与 offload 配置实战
- [ ] Megatron-LM / Megatron-Core：并行化代码结构
- [ ] 大规模训练的稳定性：loss spike、梯度裁剪、checkpoint 与恢复

## 出口检查

能画出 64 卡跑 70B 的<mark class="va-hl">并行拓扑图</mark>，并说出每个通信域（DP/TP/PP/EP/CP）的流量。

## 参考

- [AIInfraGuide 分布式训练](https://caomaolufei.github.io/AIInfraGuide/)
- [NCCL Documentation](https://docs.nvidia.com/deeplearning/nccl/user-guide/)
- 配套任务：[阶段三 · 系统能力进阶](/posts/km-phase-3/)
