---
metaTitle: true
layout: article
draft: false
katex: true
title: PMS Basics (HBTU)
subtitle: "Reused and rehashed."
blurb: Process modeling and simulation equations.
tags: [local, HBTU, college, semester, syllabus]
author: [Rohit Goswami]
publishDate: 2017-12-03
cleveref: On
xnos-number-sections: On
autotoc: true
---

### Introduction

These are a compilation of searchable components which are typically asked. (top level headings are currently lower [FIX LATER])

#### Ordinary Differential Equations

Common:
$$ f(x_0,y_0)=y' $$

<!-- {#eq:fapprox} -->

- $h$ is the step size
- $x_0$ and $y_0$ are starting values

#### Runge Kutta Methods

The general form is

$$ y_1=y_0+k $$

<!-- {#eq:rkGen} -->

### Runge Kutta I

$$ k=hf(x_0,y_0) $$

<!-- {#eq:rk1k} -->

### Runge Kutta II

$$ k_1=hf(x_0,y_0) $$

<!-- {#eq:rk2k1} -->

$$ k_2=hf(x_0,y_0+k_1) $$

<!-- {#eq:rk2k2} -->

$$ k=\frac{1}{2}(k_1+k_2) $$

<!-- {#eq:rk2k} -->

### Runge Kutta III

$$ k_1=hf(x_0,y_0) $$

<!-- {#eq:rk3k1} -->

$$ k_2=hf(x_0+\frac{h}{2},y_0+\frac{k_1}{2}) $$

<!-- {#eq:rk3k2} -->

$$ k'=hf(x_0+h,y_0+k_1) $$

<!-- {#eq:rk3kp} -->

$$ k_3=hf(x_0+h,y_0+k') $$

<!-- {#eq:rk3k3} -->

$$ k=\frac{1}{6}(k_1+4k_2+k_3) $$

<!-- {#eq:rk3k} -->

### Runge Kutta IV

$$ k_1=hf(x_0,y_0) $$

<!-- {#eq:rk4k1} -->

$$ k_2=hf(x_0+\frac{h}{2},y_0+\frac{k_1}{2}) $$

<!-- {#eq:rk4k2} -->

$$ k_3=hf(x_0+\frac{h}{2},y_0+\frac{k_2}{2}) $$

<!-- {#eq:rk4kp} -->

$$ k_4=hf(x_0+h,y_0+k_3) $$

<!-- {#eq:rk4k3} -->

$$ k=\frac{1}{6}(k_1+2k_2+2k_3+k_4) $$

<!-- {#eq:rk4k} -->

### Milne's Predictor Corrector

$$ y_4^P=y_0+4\frac{h}{3}(2f_1-f_2+2f_3) $$

<!-- {#eq:mpcP} -->

$$ y_4^C=y_2+\frac{h}{3}(f_2+4f_3+f_4) $$

<!-- {#eq:mpcC} -->

#### Root Finding Methods

### Newton Raphson

$$ x_{i+1}=x_i-\frac{f(x_i)}{f'(x_i)} $$

### Regula Falsi

With $a$ and $b$ as the interval points.

Evaluate $f(a)$ and $f(b)$.

$$ x_r=\frac{af(b)-bf(a)}{f(b)-f(a)} $$

**Check**

$$f(a)f(x_r)<0\implies{b}=x_r$$
$$f(a)f(x_r)>0\implies{a}=x_r$$

### Secant

$$ x_{i+1}=\frac{x_{i-1}f_i-x_i{f_{i-1}}}{f_i-f_{i-1}} $$

### Bisection

With $a$ and $b$ as the interval points such that $f(a)f(b)<0$.

$$ x_r=\frac{a+b}{2} $$

**Check**

$$f(a)f(x_r)<0\implies{b}=x_r$$
$$f(a)f(x_r)>0\implies{a}=x_r$$

### SOR

$$ x_i^k=x_i^{k-1}+w[x_{gs}^k-x_i^{k-1}] $$

Where:

- $x_{gs}^k$ is the $k^{th}$ iteration Gauss-Seidel vector
- $w\in[1,2]$ for speed and is usually taken as $1.2$

$$ x_{gs}^{k+1}=C+{B}X^k $$
