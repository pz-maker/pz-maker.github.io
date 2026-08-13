---
title: Python 学习笔记
date: 2026-08-03
lastmod: 2026-08-12
tags: [python]
categories:
  - 技术文章
description: "名字与对象引用、函数参数传递、深浅拷贝、闭包与高阶函数——Python 对象模型的核心概念，配代码示例逐条验证。"
---

# Python 学习笔记

> 学 Python 时最容易踩的坑，九成来自"对象模型"没吃透。这篇笔记围绕<mark class="va-hl">引用语义</mark>展开，全部示例可直接运行验证。

## 开始前最小的工具箱

在排查环境问题前，先记录以下命令的输出，不要立刻反复重装。**可观察的信息越完整，定位越快**。

```bash
python --version       # 正在使用哪个 Python
which python           # 这个可执行文件来自哪里
python -m pip --version

g++ --version          # C++ 编译器版本
cmake --version        # 构建系统版本

uname -a               # 内核与系统信息
ps aux                 # 有哪些进程
free -h                # 主机内存使用
df -h                  # 文件系统容量

nvidia-smi             # 驱动可见的 GPU 与进程
nvcc --version         # CUDA Toolkit 中的编译器版本
```

## 名字、对象和引用

Python 中变量是对象的**引用**，而非值本身。赋值操作只是让两个名字指向同一个对象。

```python
a = [1, 2]
b = a
b.append(3)

print(a)        # [1, 2, 3]
print(a is b)   # True：指向同一个对象
print(a == b)   # True：值相等
```

## 函数收到的是对象引用

函数参数传递的也是引用。区分 **原地修改（mutate）** 和 **重新绑定（rebind）** 至关重要：

```python
def mutate(xs: list[int]) -> None:
    xs.append(1)          # 修改调用方可见的同一个列表

def rebind(xs: list[int]) -> None:
    xs = [1]              # 只让局部名字 xs 指向新列表

data: list[int] = []      # 显式声明元素类型为 int
mutate(data)
print(data)               # [1]

rebind(data)
print(data)               # 仍然是 [1]
```

### ⚠️ 为什么返回值是 None？

如果一个方法**原地修改**了对象，就不应该同时返回该对象，以避免让调用者误以为得到了一个新对象。

### ⚠️ 默认参数陷阱

默认参数**只在函数定义时创建一次**，使用可变对象（如列表）作为默认值会导致多次调用共享同一对象：

```python
# ❌ 错误：同一个列表会被多次调用共享
def collect_bad(x: int, result: list[int] = []) -> list[int]:
    result.append(x)
    return result

# ✅ 正确：用 None 表示"未提供"
def collect(x: int, result: list[int] | None = None) -> list[int]:
    if result is None:
        result = []
    result.append(x)
    return result
```

## 浅拷贝与深拷贝

`copy` 模块与 `.copy()` 方法同名但来源不同：`.copy()` 是内置类型自带的方法，`copy.deepcopy()` 需要导入标准库。

```python
import copy

src = [[1], [2]]
shallow = src.copy()           # 只复制最外层列表
deep = copy.deepcopy(src)      # 递归复制内部对象

shallow[0].append(9)
print(src)                     # [[1, 9], [2]]  ← 浅拷贝影响了原对象
print(deep)                    # [[1], [2]]      ← 深拷贝完全独立
```

## 闭包与高阶函数

```python
from collections.abc import Callable

def make_multiplier(scale: float) -> Callable[[float], float]:
    # Callable[[输入类型], 输出类型]
    # 多参数示例：Callable[[str, int], tuple[bool, str]]
    def multiply(x: float) -> float:
        return x * scale
    # scale 是 Enclosing 层变量（LEGB 中的 E）
    # Python 将 scale 打包进闭包，即使外层函数已返回，值仍被保留
    return multiply

double = make_multiplier(2.0)
print(double(3.0))  # 6.0
```

### 核心概念总结

| 概念 | 在本例中的体现 | 新手要点 |
| :--- | :--- | :--- |
| **闭包** | `multiply` 记住了外层的 `scale` | 内部函数 + 自由变量 = 闭包 |
| **高阶函数** | `make_multiplier` 返回一个函数 | 函数可以作为返回值 |
| **类型提示** | `Callable[[float], float]` | 仅辅助 IDE/静态检查，不影响运行 |
| **函数工厂** | 传不同 `scale` 生成不同函数 | 避免重复写相似函数 |

## 下一步

- [ ] 面向对象、装饰器、生成器（见 [阶段一 · 前置检查清单](/posts/km-phase-1/)）
- [ ] 多进程 / 多线程与 GIL 影响边界

> 相关：[阶段一 · 前置检查清单](/posts/km-phase-1/) ｜ [AI Infra 学习路线](/posts/knowledge-map/)