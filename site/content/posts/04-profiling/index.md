---
title: 04 性能分析
date: 2026-08-10
status: todo
tags: [profiling, nsight, pytorch]categories:
  - 学习路径
lastmod: 2026-08-11
description: "不靠猜：用工具定位瓶颈，用数据驱动优化。Roofline 是标尺，对照实验是方法。参考 AIInfraGuide「性能分析」模块，逐项任务见 [学习任务清单](/posts/stu…"
---

# 04 性能分析

> 不靠猜：用工具定位瓶颈，用数据驱动优化。<mark class="va-hl">Roofline 是标尺，对照实验是方法</mark>。参考 AIInfraGuide「性能分析」模块，逐项任务见 [学习任务清单](/posts/study-plan/)。

## 工具链

- [ ] `torch.profiler`：CPU/GPU 时间线、内存快照、`export_chrome_trace`
- [ ] Nsight Systems：整体时间线、kernel 间隙定位
- [ ] Nsight Compute：单 kernel 指标（SM 占用、内存吞吐、warp stall）
- [ ] 辅助工具：`nvidia-smi dmon`、`py-spy dump`、`perf`

## 分析方法

- [ ] 三层定位：系统层 → 框架层 → kernel 层
- [ ] 瓶颈分类：计算密集 vs 访存密集 vs 通信密集 vs 延迟等待
- [ ] Roofline 模型：算术强度与硬件峰值
- [ ] 对照实验法：单变量改动 + 量化对比表

## 报告模板

- [ ] 复现环境（硬件 / 框架版本 / 输入规模）
- [ ] 基线数据（时延、吞吐、显存、利用率）
- [ ] 瓶颈定位与证据（trace 截图、指标表）
- [ ] 优化前后对照与结论

## 出口检查

优化前后对照表里，每一项结论都能<mark class="va-hl">指到一条工具输出作为证据</mark>。

## 参考

- [AIInfraGuide 性能分析](https://caomaolufei.github.io/AIInfraGuide/)
- [Nsight Compute User Guide](https://docs.nvidia.com/nsight-compute/)
- 配套任务：[学习任务清单 → 模块五](/posts/study-plan/)
