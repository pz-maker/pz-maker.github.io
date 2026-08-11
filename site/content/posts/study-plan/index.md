---
title: 学习任务清单
date: 2026-08-10
status: doing
tags: [plan, roadmap]categories:
  - 学习路径
lastmod: 2026-08-11
description: "参照 [AIInfraGuide](https://caomaolufei.github.io/AIInfraGuide/)（AI Infra 全栈知识库：前置基础 20 篇 / …"
---

# 学习任务清单

> 参照 [AIInfraGuide](https://caomaolufei.github.io/AIInfraGuide/)（AI Infra 全栈知识库：前置基础 20 篇 / CUDA 23 篇 / 分布式 17 篇 / 推理 18 篇）拆解的详尽学习任务。每章任务 = <mark class="va-hl">读参考文章 + 动手实验 + 产出本站沉淀</mark>，勾选推进。

## 总览与节奏

| 模块 | 参考篇数 | 预估周数 | 产出落点 |
| --- | --- | --- | --- |
| 00 前置基础 | 20 | 3 周 | [00 前置基础](/posts/00-prerequisites/) |
| 01 CUDA 与算子优化 | 23 | 6 周 | [01 CUDA 与算子优化](/posts/01-cuda/) |
| 02 分布式训练 | 17 | 5 周 | [02 分布式训练](/posts/02-distributed/) |
| 03 推理优化 | 18 | 5 周 | [03 推理优化](/posts/03-inference/) |
| 04 性能分析 | 0（更新中） | 贯穿全程 | [04 性能分析](/posts/04-profiling/) |

**节奏**：每周 <mark class="va-hl">3~5 个任务</mark>（读 2~3 篇 + 动手 1 个 + 总结 1 次），周日写 [周总结](/weekly/)，读完经典论文写 [阅读小记](/reading/)。每完成一个任务勾选对应复选框，并同步推进 [学习路径](/path/) 总览的徽标。

---

## 模块一 · 前置基础（20 篇 / 约 3 周）

**目标**：补齐编程、数学、Transformer、PyTorch、GPU 硬件、集合通信<mark class="va-hl">六块地基</mark>，能读懂 CUDA 模块的任意代码。

### 第 1 章 编程语言基础

- [ ] 读 Python 进阶：装饰器、生成器、`__slots__`、`multiprocessing` 与 GIL
- [ ] 读 C/C++ 核心：指针与内存模型、编译链接（`-O2` 与 `-pg`）、`extern "C"`
- [ ] 读 Linux 开发环境：权限、进程、`tmux` / `nohup`、环境变量排查
- [ ] 产出：更新本站「00 前置基础 → Linux 与命令行 / Python 与工具链」小节，补 3 条自查清单

### 第 2 章 数学基础

- [ ] 读线性代数：GEMM 的 tiling 直觉、范数与条件数
- [ ] 读概率论：分布、期望、信息熵在 softmax / 采样中的角色
- [ ] 读微积分：反向传播的链式法则、混合精度下的数值误差
- [ ] 产出：写一篇短小记《我如何用一张纸推导出 GEMM 的访存量》到 [阅读小记](/reading/)

### 第 3 章 Transformer（10 篇，重点）

- [ ] 读快速入门篇 + 为什么 AI Infra 工程师必须懂 Transformer
- [ ] 读全貌及代码实现：手敲一遍 mini Transformer
- [ ] 读 Self-Attention 深入理解：Q/K/V、缩放点积、掩码
- [ ] 读 FFN 深入理解：激活、GELU、GLU 变体
- [ ] 读位置编码深入理解：RoPE 的旋转几何意义
- [ ] 读 LayerNorm 与残差：为什么在 pre-norm 之后 LayerNorm 是热点算子
- [ ] 读 Decoder Block 完整解析：KV Cache 为什么诞生
- [ ] 读 LLM 自回归生成：prefill / decode 两阶段的计算差异
- [ ] 读 Tokenization：BPE 与词表扩张的成本
- [ ] 产出：阅读小记《从 Attention 到 KV Cache：解码端的三笔账》（显存/计算/访存）

### 第 4 章 PyTorch 框架（1 篇）

- [ ] 读 PyTorch 快速入门：Tensor、自动微分、`torch.compile` 初体验
- [ ] 动手：从零实现并训练一个 GPT-2 级别小模型（1 天内跑通）
- [ ] 产出：周总结里记录训练脚本的显存占用与速度基线

### 第 5 章 GPU 硬件概论（2 篇）

- [ ] 读 GPU 基础知识：从硬件架构到 AI 计算（SM、显存层次、带宽量级）
- [ ] 读架构演进：Volta → Ampere → Hopper → Blackwell 的关键变化
- [ ] 动手：跑 `nvidia-smi` 读自家 GPU 的 SM 数、显存带宽、NVLink 拓扑
- [ ] 产出：在「00 前置基础 → GPU 基本概念」补一张「带宽速查表」（L2/HBM/NVLink/PCIe）

### 第 6 章 集合通信基础（1 篇）

- [ ] 读集群通信网络与 NCCL：AllReduce / AllGather 语义与 Ring 算法
- [ ] 动手：用 `torch.distributed` 在 2 卡上跑 all-reduce，测通信量与耗时曲线
- [ ] 产出：阅读小记《Ring AllReduce 的通信量为什么是 2(n-1)/n》

**模块一出口检查**：能独立解释「<mark class="va-hl">一张 A100 上跑 7B 模型做 prefill</mark>，每 token 的算力与带宽需求各是多少」。

---

## 模块二 · CUDA 编程与算子优化（23 篇 / 约 6 周）

**目标**：从 hello kernel 到手写 GEMM/FlashAttention，建立「<mark class="va-hl">内存移动 > 计算</mark>」的性能直觉。

### 第 1 章 CUDA 编程入门（4 篇）

- [ ] 读开发环境搭建：`nvcc`、CMake、Nsight 套件安装
- [ ] 读编程模型：Grid / Block / Thread、warp 与 SIMT
- [ ] 读内存模型：global / shared / register / constant 的带宽与容量
- [ ] 读第一个实用 Kernel：向量加法（含错误检查与计时）
- [ ] 动手：完成向量加法三版（naive / grid-stride / 向量化 `float4`）并测速
- [ ] 产出：更新「01 CUDA → CUDA 编程模型 / Kernel 优化基础」小节

### 第 2 章 CUDA 性能优化基础（4 篇）

- [ ] 读 Warp 与执行模型：占用率、warp 调度、分支发散
- [ ] 读内存访问优化：合并访问、bank conflict、`__ldg` / 只读缓存
- [ ] 读 Occupancy 与资源分配：寄存器上限、`__launch_bounds__`
- [ ] 读同步与原子：`__syncthreads()`、atomicAdd 的竞争语义
- [ ] 动手：用 Nsight Compute 分析向量加法，定位瓶颈是带宽还是延迟

### 第 3 章 Reduce 算子（1 篇）

- [ ] 读 CUDA Reduce 优化：朴素 → 共享内存树形归约 → warp shuffle
- [ ] 动手：三版 Reduce 全部实现，画出「版本 × 耗时」表
- [ ] 产出：阅读小记《Reduce 的三种并行化思路与访存模式》

### 第 4 章 GEMM 算子（1 篇，本模块核心）

- [ ] 读 GEMM 性能优化：Block-Warp-Thread 三级 tiling、向量化、双缓冲
- [ ] 动手：从 naive GEMM 出发，逐版优化到 cuBLAS 的 60%+ 性能（预留 2 周）
- [ ] 产出：阅读小记《GEMM 优化从 10% 到 60%：我改了什么》+ 代码存档

### 第 5 章 Softmax 与算子融合（2 篇）

- [ ] 读 Softmax 朴素实现与数值稳定（减最大值）
- [ ] 读 Online Softmax：单遍扫描 + 运行归一化
- [ ] 动手：实现 fused softmax（读一次、算一次、写一次）

### 第 6 章 Attention 算子（2 篇）

- [ ] 读 FlashAttention V1 详解：tiling、online softmax、重计算
- [ ] 读 FlashAttention V2 详解：减少非矩阵乘指令、并行维度调整
- [ ] 动手：用 Triton 复现 FlashAttention 核心循环，对照 PyTorch 正确性
- [ ] 产出：把推导与实现写入「01 CUDA → 经典算子」

### 第 7 章 AI 编译器

- [ ] 读 Triton 块级编程模型、`torch.compile` 编译模式、TVM/XLA 定位
- [ ] 动手：用 Triton 重写 GEMM 的一个 tiling 版本，对比手写 CUDA 的代码量与性能

### 第 8 章 性能分析工具链（贯穿）

- [ ] 读 Nsight Systems：时间线、kernel 间隙、`nvtx` 标注
- [ ] 读 Nsight Compute：SM 占用、内存吞吐、warp stall 原因
- [ ] 读 PyTorch Profiler：`export_chrome_trace` 与内存快照
- [ ] 动手：给第 4 章 GEMM 的每个版本留一份 Nsight Compute 报告

**模块二出口检查**：能对着 Nsight Compute 的报告，说出任意 kernel「<mark class="va-hl">为什么慢、瓶颈在哪、下一步改什么</mark>」。

---

## 模块三 · 分布式训练（17 篇 / 约 5 周）

**目标**：掌握五大并行策略的<mark class="va-hl">显存与通信账本</mark>，能用 `torchrun` 跑起 DDP/FSDP 训练。

### 第 1 章 分布式训练总论（2 篇）

- [ ] 读显存账本与五大并行策略全景：参数 / 梯度 / 优化器状态 / 激活的归属
- [ ] 读环境搭建与分布式启动：rank / world_size / `torchrun` / NCCL 初始化
- [ ] 动手：2 卡跑通第一个 DDP 脚本，观察梯度同步日志

### 第 2 章 集合通信原语（1 篇）

- [ ] 读集合通信详解：AllReduce / ReduceScatter / AllGather / All-to-All 语义与通信量
- [ ] 动手：写 micro-benchmark 测 2/4 卡各原语的耗时，验证 O(n) 通信量公式

### 第 3 章 优化器（1 篇）

- [ ] 读优化器演进：SGD → AdamW 的状态量与显存开销
- [ ] 动手：手算 7B 模型在 AdamW 下的优化器状态显存（应为 56GB 量级）

### 第 4 章 数据并行（2 篇）

- [ ] 读数据并行详解：DP / DDP / FSDP 三代演进
- [ ] 读 PyTorch 数据并行从原理到实战：梯度桶、通信重叠
- [ ] 动手：同一模型分别跑 DDP 与 FSDP，对比显存与吞吐，记录 sharding 策略差异

### 第 5 章 ZeRO 显存优化系列

- [ ] 读 ZeRO-1/2/3 切分策略与通信代价：梯度 / 参数 / 优化器状态的逐级分片
- [ ] 读 ZeRO-Offload / Infinity：CPU 卸载与 NVMe 卸载的带宽墙
- [ ] 动手：DeepSpeed ZeRO-2 跑 7B 级模型，观察通信量翻倍但显存减半

### 第 6 章 张量并行与序列并行

- [ ] 读 Megatron TP：Column / Row Parallel Linear 与通信插入位置推导
- [ ] 读序列并行：LayerNorm 激活的 SP 切分
- [ ] 动手：推导 MLP 在 TP=2 时每层 AllReduce 次数与数据量

### 第 7 章 流水线并行

- [ ] 读流水线并行：Bubble 问题、GPipe / 1F1B / Interleaved 调度量化对比
- [ ] 动手：算 8 卡 PP=8 与 PP=4×DP=2 的 bubble 率差异

### 第 8 章 混合精度与显存优化

- [ ] 读 FP16/BF16/FP8：损失缩放、溢出范围、精度-吞吐权衡
- [ ] 读梯度累积与 Activation Checkpointing：代价分析
- [ ] 动手：BF16 + 梯度累积 + checkpointing 三件套跑通训练

### 第 9 章 长序列训练与上下文并行

- [ ] 读长序列困境：Attention 的 O(s²) 与 Ring Attention / Ulysses / Context Parallel 对比
- [ ] 动手：用 Sequence Parallel 把序列长度翻倍训练，记录吞吐变化

### 第 10 章 MoE 并行

- [ ] 读 MoE 并行：Router、Expert Parallelism 的 All-to-All、负载均衡
- [ ] 动手：用 DeepSpeed 跑小 MoE 模型，观察 All-to-All 在弱负载下的浪费

### 第 11 章 3D 并行与混合并行策略

- [ ] 读 3D 并行：TP×PP×DP×EP×CP 的通信域映射与 rank 编排
- [ ] 读选型：给定集群规模与模型，如何选出最优并行组合
- [ ] 动手：完成一个「64 卡跑 70B」的并行方案设计文档（写进周总结）

**模块三出口检查**：能画出 <mark class="va-hl">64 卡 70B</mark> 训练的并行拓扑图，并说出每个通信域的流量。

---

## 模块四 · 推理优化（18 篇 / 约 5 周）

**目标**：从 <mark class="va-hl">KV Cache 到 vLLM 部署</mark>，掌握推理引擎核心技术与量化、投机解码等优化手段。

### 第 1 章 LLM 推理基础（1 篇）

- [ ] 读 LLM 推理基础：Prefill/Decode 两阶段、KV Cache 机制、TTFT/TPOT/吞吐指标
- [ ] 动手：手算 7B FP16 模型在 4K 上下文下的 KV Cache 显存

### 第 2 章 推理引擎核心技术（5 篇）

- [ ] 读 PagedAttention：像操作系统一样管理 KV Cache 内存
- [ ] 读 Continuous Batching：动态批处理的调度语义
- [ ] 读 Prefix Cache 与 RadixAttention：共享前缀复用
- [ ] 读 Chunked Prefill：长请求分块与 Token Budget 调度
- [ ] 读 Attention 后端与图优化：FlashInfer / CUTLASS 后端对比
- [ ] 动手：vLLM 里分别开关 prefix caching，对比多轮对话吞吐

### 第 3 章 深入 vLLM（1 篇）

- [ ] 读 vLLM 快速入门：架构、V1 引擎、调度器、关键配置
- [ ] 动手：部署一个 7B 模型，测并发 1/8/32 的吞吐与 TTFT 曲线

### 第 4 章 量化

- [ ] 读 W8A8（SmoothQuant）：激活离群值的迁移
- [ ] 读 INT4（GPTQ / AWQ）：权重压缩的两种路线
- [ ] 读 KV Cache 量化与 FP8：精度-容量-速度三角
- [ ] 动手：AWQ 量化 7B 模型部署，对比量化前后吞吐与困惑度

### 第 5 章 Speculative Decoding

- [ ] 读投机解码原理：Draft + Verify 与加速比上限
- [ ] 读 Self-Draft：Medusa / EAGLE-2 的收益边界
- [ ] 动手：vLLM 开启投机解码，实测小模型做 draft 的端到端加速

### 第 6 章 分布式推理与大模型部署

- [ ] 读推理场景的 TP/PP/DP/EP 与 Ray 多节点部署
- [ ] 动手：TP=2 部署 13B 模型，对比单卡 7B 的吞吐

### 第 7 章 Prefill/Decode 解耦

- [ ] 读 P/D 混合 Batching 问题、DistServe / Splitwise 解耦、KV 传输与 Goodput
- [ ] 动手：画一张 P/D 解耦架构的请求流程图写进阅读小记

### 第 8 章 生产级服务特性

- [ ] 读结构化输出、Tool Calling、Multi-LoRA、多模态与采样算法

### 第 9 章 性能分析与 Benchmark

- [ ] 读推理性能指标体系：`vllm bench`、GenAI-Perf 压测工具
- [ ] 动手：为自家服务建立压测基线表（并发 × TTFT × TPOT × 吞吐）

### 第 10 章 生产部署与运维

- [ ] 读容器化与 K8s 部署、可观测性、HPA、负载均衡与容量规划
- [ ] 动手：写一份 K8s Deployment + HPA yaml 到本站周总结

### 第 11 章 选型与端到端实战

- [ ] 读推理优化选型决策树与技术叠加注意事项
- [ ] 端到端实战：从需求分析 → 选型 → 部署 → 监控跑通一个推理服务
- [ ] 产出：把决策过程写成周总结《一次推理服务的完整选型》

**模块四出口检查**：能独立完成「7B 模型上线」全流程，并回答「<mark class="va-hl">为什么这里用 AWQ 而不是 GPTQ</mark>」。

---

## 模块五 · 性能分析（贯穿全程）

参考站该模块尚在更新（0 篇），本站任务先自行推进：

- [ ] 建立「三层定位」方法论：系统层 → 框架层 → kernel 层
- [ ] 建立「对照实验」习惯：单变量改动 + 量化对比表
- [ ] 每完成一个优化任务，按 [04 性能分析](/posts/04-profiling/) 的报告模板留档
- [ ] 维护「瓶颈速查表」：计算密集 / 访存密集 / 通信密集 / 延迟等待的典型特征

---

## 周度循环

每周日按固定模板写 [周总结](/weekly/)：

1. 本周完成（勾选的任务编号）
2. 卡点与思考（至少写一个「我卡住后如何突破」）
3. 下周计划（3~5 个具体任务）
4. 路径进度（更新 [总览](/path/) 徽标）
