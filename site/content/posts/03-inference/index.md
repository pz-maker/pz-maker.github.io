---
title: 03 推理优化
date: 2026-08-10
status: todo
tags: [inference, quantization, vllm]categories:
  - 学习路径
lastmod: 2026-08-11
description: "从模型压缩到服务化部署的推理链路：KV Cache 是起点，PagedAttention 是引擎，量化是杠杆。参考 AIInfraGuide「推理优化」模块（约 18 篇），逐项任…"
---

# 03 推理优化

> 从模型压缩到服务化部署的推理链路：<mark class="va-hl">KV Cache 是起点，PagedAttention 是引擎，量化是杠杆</mark>。参考 AIInfraGuide「推理优化」模块（约 18 篇），逐项任务见 [学习任务清单](/posts/study-plan/)。

## 模型压缩

- [ ] 量化原理：PTQ vs QAT，INT8 / INT4 精度损失来源
- [ ] GPTQ / AWQ / SmoothQuant：激活与权重分布处理
- [ ] 剪枝与蒸馏概览：结构化剪枝、LoRA 蒸馏
- [ ] 量化工具链：`bitsandbytes`、`auto-gptq`、TensorRT 量化

## 推理引擎

- [ ] KV Cache：内存占用公式与 PagedAttention 动机
- [ ] vLLM：continuous batching、投机解码、prefix caching
- [ ] TensorRT-LLM：图优化、算子融合、in-flight batching
- [ ] 其他方案对比：TGI、SGLang、llama.cpp

## 服务化部署

- [ ] OpenAI 兼容 API：`/v1/chat/completions` 协议
- [ ] 吞吐 / 延迟权衡：`max_num_seqs`、`gpu_memory_utilization` 调参
- [ ] 多副本与负载均衡：K8s + GPU 调度
- [ ] 在线评测：TTFT / TPOT / 并发压测（`benchmark_serving`）

## 出口检查

能独立完成「7B 模型上线」全流程，并回答「<mark class="va-hl">为什么这里用 AWQ 而不是 GPTQ</mark>」。

## 参考

- [AIInfraGuide 推理优化](https://caomaolufei.github.io/AIInfraGuide/)
- [vLLM Documentation](https://docs.vllm.ai/)
- 配套任务：[学习任务清单 → 模块四](/posts/study-plan/)
