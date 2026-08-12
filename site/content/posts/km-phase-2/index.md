---
title: 阶段二 · AI 工程入门（3~6 个月）
date: 2026-08-12
lastmod: 2026-08-12
tags: [roadmap, phase-2, pytorch, llm, mlops, kubernetes]
categories:
  - 知识地图
description: "3~6 个月｜Deadline 2027-02-12：PyTorch、大语言模型、MLOps、云原生。"
---

# 阶段二 · AI 工程入门

> **时间**：3 ~ 6 个月　**Deadline**：<mark class="va-hl">2027-02-12</mark>　**状态**：⏳ 未开始
> **输出**：每章学完在 [知识地图](/posts/knowledge-map/) 下更新进度，训练/部署实验存档本站。

## 2.1 深度学习框架

**教材**：《Deep Learning with PyTorch》，Eli Stevens 等

**阅读范围**：
- 第 2 章：预训练网络与 Tensor（全读）
- 第 4~5 章：张量、自动微分机制（精读）
- 第 6~8 章：nn.Module、优化器、损失函数（精读）
- 第 11~13 章：部署、生产环境、ONNX（精读）
- 其余章节：选读

**深度要求**：掌握
- 能手写一个简单的神经网络训练流程（不含高层 API）
- 理解 autograd 的反向传播图构建机制
- 理解 DataLoader 的多进程数据加载原理
- 能将 PyTorch 模型导出为 ONNX 并用 ONNX Runtime 推理

**补充**：PyTorch 官方文档 Tutorial（60 分钟入门 + 数据加载 + 模型保存加载）

## 2.2 大语言模型基础

**教材**：《大规模语言模型：从理论到实践》，张奇、桂韬 等

**阅读范围**：
- 第 2 章：大语言模型基础（Transformer 架构，精读）
- 第 3 章：预训练（数据构建、训练策略，精读）
- 第 4 章：指令微调和低秩适配（精读）
- 第 5 章：奖励模型与 RLHF（精读）
- 第 6 章：大语言模型应用（RAG、Agent，精读）

**深度要求**：掌握
- 能手推 Transformer 的 Attention 计算流程和复杂度
- 理解预训练数据清洗、去重、质量过滤的工程细节
- 理解 SFT、RLHF 的数据构造和训练流程
- 能搭建一个简单的 RAG 系统（向量数据库 + Embedding + LLM）

**补充教材**：《Build a Large Language Model (From Scratch)》，Sebastian Raschka

**阅读范围**：
- 第 2~3 章：Tokenization、Embedding（精读）
- 第 4 章：注意力机制（精读，手推代码）
- 第 5 章：Transformer 实现（精读，逐行理解）
- 第 6~7 章：预训练与微调（精读）

**深度要求**：掌握
- 从零手写一个 GPT-2 级别的模型（参数量可缩小）
- 理解每个组件的内存占用和计算量
- 能在单卡 GPU 上完成小规模预训练实验

## 2.3 机器学习工程与 MLOps

**教材**：《设计机器学习系统（Designing Machine Learning Systems）》，Chip Huyen

**阅读范围**：
- 第 1~3 章：ML 系统概述、数据工程、特征工程（精读）
- 第 5~6 章：模型开发与训练（精读）
- 第 7~8 章：模型部署、预测服务（精读）
- 第 9~10 章：监控、持续学习（精读）
- 第 11 章：基础设施与工具（精读）

**深度要求**：理解
- 能设计一个完整的 ML 项目流程（从数据到部署）
- 理解批处理推理 vs 在线推理的架构差异
- 理解模型版本管理、A/B 测试、影子测试
- 了解主流 MLOps 工具链（MLflow、Kubeflow、Airflow）

## 2.4 云原生基础

**教材**：《Docker 技术入门与实战》第三版 + Kubernetes 官方文档

**阅读范围**：
- Docker：镜像构建、容器生命周期、网络模式、数据卷（全读）
- K8s 官方文档：Pod、Deployment、Service、ConfigMap、Secret（精读）
- K8s 官方文档：调度、资源管理、HPA（理解）

**深度要求**：理解
- 能手写 Dockerfile 构建 AI 推理服务镜像
- 能编写 K8s YAML 部署一个简单的模型服务
- 理解容器与虚拟机的本质区别
- 理解 K8s 的调度原理和资源隔离机制

## 验收标准

- [ ] 手写 PyTorch 训练一个 ResNet-18 并在 CIFAR-10 上达到 90%+ 准确率
- [ ] 从零实现一个简化版 GPT-2（参数量 >= 100M），在 WikiText 上训练
- [ ] 搭建一个完整的 RAG 系统（含向量检索 + LLM 生成）
- [ ] 用 Docker + K8s 部署一个模型推理服务，支持自动扩缩容
- [ ] 能向面试官解释 Transformer 的 FLOPs 计算和内存瓶颈

---

[← 阶段一：基础工程筑基](/posts/km-phase-1/) · [路线总览](/posts/knowledge-map/) · [下一阶段：系统能力进阶 →](/posts/km-phase-3/)