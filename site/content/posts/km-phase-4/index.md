---
title: 阶段四 · 平台架构与前沿（12~18 个月）
date: 2026-08-12
lastmod: 2026-08-12
tags: [roadmap, phase-4, kubernetes, architecture, paper]
categories:
  - 知识地图
description: "12~18 个月｜Deadline 2028-02-12：K8s 云原生平台、系统架构设计、前沿论文、国产芯片。"
---

# 阶段四 · 平台架构与前沿

> **时间**：12 ~ 18 个月　**Deadline**：<mark class="va-hl">2028-02-12</mark>　**状态**：⏳ 未开始
> **输出**：每章学完在 [知识地图](/posts/knowledge-map/) 下更新进度，论文精读与技术分享输出本站。

## 4.1 Kubernetes 与云原生平台

**教材**：《深入剖析 Kubernetes》，张磊

**阅读范围**：
- 第 1~3 章：容器与 K8s 本质、编排与调度（精读）
- 第 4~5 章：控制器与声明式 API（精读）
- 第 6~7 章：存储与网络（精读）
- 第 8~9 章：调度与资源管理（精读）
- 第 10~11 章：容器运行时与 CRI（理解）

**深度要求**：掌握
- 理解 K8s 控制循环（Reconcile Loop）的设计哲学
- 理解 Pod 生命周期、健康检查、优雅终止
- 理解 K8s 网络模型（CNI、Service、Ingress）
- 能编写自定义 Controller 或 Operator

**补充教材**：《Kubernetes 云原生数据管理》

**阅读范围**：
- 第 1~3 章：K8s 数据管理基础（精读）
- 第 4~6 章：有状态应用、Operator、数据流（精读）
- 第 7~9 章：ML 用例、安全、监控（精读）

**深度要求**：理解
- 理解 StatefulSet 与 Deployment 的本质区别
- 理解 CSI 存储接口
- 能在 K8s 上设计一个支持多租户的 AI 训练平台架构

## 4.2 系统架构设计

**教材**：《凤凰架构：构建可靠的大型分布式系统》，周志明

**阅读范围**：
- 第 1~3 章：架构演进、访问远程服务（精读）
- 第 4~5 章：事务处理、分布式共识（精读）
- 第 6~7 章：容器、服务网格（精读）
- 第 8~10 章：无服务、向硬件发展、软件向云原生（理解）

**深度要求**：掌握
- 理解微服务架构的优缺点和适用边界
- 理解 Service Mesh（Istio/Linkerd）的 Sidecar 模式
- 理解不可变基础设施和 GitOps
- 能设计一个高可用的 AI 推理服务平台

**补充教材**：《微服务架构设计模式》，Chris Richardson

**阅读范围**：
- 第 1~3 章：微服务核心概念、拆分策略（精读）
- 第 4~6 章：事务管理、业务逻辑设计（精读）
- 第 7~9 章：查询、外部 API 模式、测试（选读）

**深度要求**：理解
- 掌握 Saga 模式处理分布式事务
- 理解 API 组合模式与 CQRS
- 理解微服务测试策略（单元、集成、契约、E2E）

## 4.3 前沿论文与技术追踪

**教材**：无书籍，以顶会论文为主

**必读论文清单**：
- **训练系统**：Megatron-LM、DeepSpeed、FSDP、Colossal-AI、Alpa
- **推理系统**：vLLM（PagedAttention）、Orca（Iteration-level Scheduling）、SGLang
- **注意力优化**：FlashAttention v1/v2/v3、Ring Attention、Striped Attention
- **长上下文**：LongLoRA、YaRN、Mamba、RWKV
- **MoE**：Switch Transformer、Mixtral、DeepSeek-MoE
- **量化**：GPTQ、AWQ、SmoothQuant、FP8（LLM.int8()）
- **AI 编译器**：TVM、XLA、MLIR、TorchInductor

**深度要求**：精通
- 能独立复现或理解论文核心算法的实现
- 能分析论文中实验设计的合理性
- 能将论文中的技术应用到实际项目中
- 能向团队做技术分享，讲清楚论文的动机、方法和局限

**追踪渠道**：
- arXiv cs.LG / cs.DC / cs.AI 每日浏览
- MLSys、OSDI、SOSP、NeurIPS、ICML 会议论文
- 关注 vLLM、SGLang、DeepSpeed 等开源项目的 Release Note

## 4.4 国产芯片生态（选学，昇腾方向）

**教材**：昇腾官方文档 + CANN 开发指南

**阅读范围**：
- CANN 架构与开发流程（精读）
- Ascend C 算子开发（掌握）
- HCCL 集合通信库（理解）
- MindSpore 框架（理解）

**深度要求**：理解
- 能在昇腾 NPU 上完成模型迁移和性能调优
- 理解达芬奇架构的 Cube/Core/Vector 单元
- 理解昇腾与 NVIDIA GPU 的编程模型差异

## 验收标准

- [ ] 设计并实现一个简化版的 AI 训练平台（支持任务提交、资源调度、日志监控）
- [ ] 精读 20 篇以上 AI Infra 顶会论文，输出技术博客或分享
- [ ] 参与一个开源项目（vLLM / DeepSpeed / Megatron-LM / SGLang）并提交 PR
- [ ] 能独立设计万卡集群训练方案（并行策略、通信优化、容错机制）
- [ ] 能向 CTO/架构师级别汇报技术方案，回答跨领域问题

---

[← 阶段三：系统能力进阶](/posts/km-phase-3/) · [路线总览](/posts/knowledge-map/)