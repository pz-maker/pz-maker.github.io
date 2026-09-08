---
title: 我的学习计划
date: 2026-08-12
lastmod: 2026-09-07
tags: [roadmap, ai-infra]
categories:
  - 知识地图
description: "近期详细、长远骨架：从数学基石开始，对接 AI Infra 职业路径的自学计划，附全部公开资源链接。"
---

# 我的学习计划

> 这一页原来是一份 AI 生成的「四阶段 18 个月」路线图，删了：过于繁杂，做不到，挂出来没有诚意。
> 现在换成两层结构——**近期详细，长远只留骨架**。近期的部分是我马上动手的数学基石；长远的部分是通向 AI Infra 的台阶，只留方向和对标课程，不再给自己排那种完成不了的日程。

<mark class="va-hl">拒绝「视频通关」的虚假熟练感，以「高强度作业 + 底层手写 + 同行评审」为唯一衡量标准。</mark>

## 三条铁律

1. **时间换算**：1 学分 = 每周 3 小时投入。一门 5 学分的硬核课 = 每周 15 小时——其中只有 3 小时看课，剩下 12 小时全部用来做题、Debug、写代码
2. **AI 使用禁令**：初学核心底层机制时彻底关掉代码补全，手敲每一行建立神经连接；只在完全掌握后的工程生产阶段用 AI 提效
3. **验证标准**：不是「看完了」，而是独立解决了多少挑战题、手写了多少行底层代码、接受了多少次真实评审

## 近期：数学基石，不可跳过

目标：建立形式化逻辑思维与概率直觉。

### 离散数学与证明 ← 正在做

- **对标**：斯坦福 CS103（Mathematical Foundations of Computing）
- **自学资源**：MIT 6.042J《Mathematics for Computer Science》，课程与习题集完全公开
- **内容**：逻辑学、集合论、函数与关系、图论、自动机理论、可计算性与复杂度理论
- **做法**：习题集拿纸笔推演，不敲进电脑里敷衍自己（准备把习题和考试整理成册打印下来，全英文，顺便学英语喽）
- **验收**：<mark class="va-hl">能熟练运用数学归纳法、反证法和鸽巢原理，完成算法正确性的证明</mark>。做不到这条，后面读再多书也是自我感动

### 概率论与统计 ← 下一门

- **对标**：斯坦福 CS109（Probability for Computer Scientists）
- **自学资源**：Harvard Stat 110，课程视频与作业公开
- **验收**：完成高质量作业；理解 MLE、贝叶斯、信息论背后的数学逻辑


## 同时在做的实践

- [Nand to Tetris](/posts/nand-to-tetris/)：从与非门搭计算机，正在推进
- [Python 学习笔记](/posts/python-notes/)：用AI搞的，还没有深入理解。
- [AI 桌宠](/posts/ai桌宠/)：环境、规范、安全、git 管理的全流程初体验
- [战地一学习记录](/posts/战地一学习记录/)：兴趣也是学习的一部分（

## 给自己的规矩

1. 计划宁可小，也要做得到：不设 18 个月的宏图，只设本周的目标
2. 学过的东西在本站留一篇笔记——写不出来，说明没学会
3. 纸笔推演优先：证明题敲进 Markdown 里不算数
4. 感到痛苦和望而生畏是正确的——学得舒服，说明强度不够

## 资源清单（全部公开，集中在此）

**数学基石**

- MIT 6.042J：[ocw.mit.edu/6-042j](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/)
- 斯坦福 CS103：[web.stanford.edu/class/cs103](https://web.stanford.edu/class/cs103/)
- Harvard Stat 110：[课程站](https://projects.iq.harvard.edu/stat110) ｜ [视频合集](https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbz-Qo)
- 斯坦福 CS109：[web.stanford.edu/class/cs109](https://web.stanford.edu/class/cs109/) ｜ [视频合集](https://www.youtube.com/playlist?list=PLoROMvodv4rOpr_A7B9SriE_iZmkanvUg)

**计算机系统**

- CMU 15-213（CS:APP）：[课程站](https://www.cs.cmu.edu/~213/) ｜ [Labs](https://csapp.cs.cmu.edu/3e/labs.html)
- MIT 6.S081（xv6）：[pdos.csail.mit.edu/6.S081](https://pdos.csail.mit.edu/6.S081/)

**算法**

- 斯坦福 CS161：[cs161.org](https://cs161.org/)
- Princeton Algorithms：[algs4.cs.princeton.edu](https://algs4.cs.princeton.edu/home/)
- MIT 6.046J：[ocw.mit.edu/6-046j](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/)

**AI 硬核**

- 斯坦福 CS229：[cs229.stanford.edu](https://cs229.stanford.edu/)
- 斯坦福 CS336：[课程站](https://stanford-cs336.github.io/) ｜ [GitHub](https://github.com/stanford-cs336)

**工程实战**

- 斯坦福 CS144：[web.stanford.edu/class/cs144](https://web.stanford.edu/class/cs144/)（官方页，会跳转到 [cs144.github.io](https://cs144.github.io/) 的 Lab 站）
- 斯坦福 CS143：[web.stanford.edu/class/cs143](https://web.stanford.edu/class/cs143/)
- Crafting Interpreters：[craftinginterpreters.com](https://craftinginterpreters.com/)

> **访问说明**：以上全是公开教育资源，无需任何账号或校内权限。但国内直连时 YouTube、GitHub（含 `*.github.io`）经常打不开或超时，需要自备网络环境；Harvard 的课程站对非浏览器访问会返回 403，用浏览器正常打开即可。
> 课程内容每年更新，最新 Lab 与 Reading List 以各课程官网为准；部分斯坦福课程的完整作业材料不公开，但核心 Labs 通常托管在 GitHub 上。

---

> 方法论参考：[《学习变现》读书笔记](/posts/learn-for-money/) ｜ 每周复盘：[周记](/posts/weekly/)
