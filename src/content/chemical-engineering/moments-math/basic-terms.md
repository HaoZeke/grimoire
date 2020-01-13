---
metaTitle: true
layout: article
draft: false
mathjax: true
title: Mathematical Preliminaries
subtitle: "Common Statistical Definitions"
blurb: A summary of basic probability for statistical design of experiments.
tags:
  [Chemical Engineering, Statistical Design of Experiments, Math, Probability]
author: [Rohit Goswami]
publishDate: 2018-02-17
modifiedDate: 2018-02-17
cleveref: On
xnos-number-sections: On
autotoc: true
---

## Random Variables

For a space of elementary events, say $\Omega=\{\omega\}$, a random variable $X$ is a real number function $X=X(\omega)$ defined on the set $\Omega$.

Essentially, $X$ may be considered to be a quantity which takes its values (say $x_i$) from a subset $R$ of real numbers.

We note that _iff_ $X$ is a random variable, a function $g(X)$ is also random.

Random variables are further quantified and classified on the basis of their _distribution functions_.

Distribution Law

: A rule (tabular, functional, graphical, etc) which permits one to find the probabilities of an event (a.k.a the random variable) is the distribution law for the random variable.

## Distribution Functions

Every random variable is defined in terms of it's probabilities, i.e they are characterized by the likelihood of having a particular value.

Mathematically, the _cumulative distribution function_ of a random variable $X$ is the function $F(x)$ whose value at every point $x$ is equal to the probability of the event ${X <x}$:

$$ F(x)=P(X<x) $$

### Properties

- $0 \leq F(x) \leq 1$
- $\lim_{x\to -\infty}F(x)=F(-\infty)=0$ and $\lim_{x\to\infty}F(x)=F(\infty)=1$
- $\forall x_i$, $x_2>x_1 \implies F(x_2)\geq F(x1)$
- $P(x_1 \leq X < x_2)=F(x_2)-F(x_1)$
- $F(x)$ is left continuous. (i.e., $\lim_{x\to(x_0-0)}F(x)=F(x_0)$)

## Types of Random Variables

On the basis of the above concepts, we now quantify random variables as:
\marginpar{$p(x)$ is the probability density function.}

$$
X \to
\begin{cases}
F(x)=P\{X < x\}=\sum_{x_n<x}p_n
 & Discrete \\
\int\limits_{-\infty}^{x} p(z)\, dz \text{ OR } p(x)=F^\prime(x) & Continuous
\end{cases}
$$

## Expectation

The expectation (expected value) $E(X)$ of a discrete or continuous random variable $X$ is mathematically defined by:

$$
E\{X\}=
\begin{cases}
\sum_i x_i p_i
 & Discrete \\
\int\limits_{-\infty}^{\infty} x p(x)\, dx & Continuous
\end{cases}
$$

For the continuous case, it is necessary that the integral or it's corresponding series converges absolutely.

In generic terms, the expectation is the main characteristic defining the "position" of a random variable, i.e., the number near which its possible values are concentrated.

Similarly, due to the similarity of functions describing random variables and random variables, given a random variable $Y$ related to a random variable $X$ by a functional dependence $Y=\phi(X)$ then we have:

$$
E\{Y\}=E\{\phi(X)\}=
\begin{cases}
\sum_i \phi(x_i) p_i
 & Discrete \\
\int\limits_{-\infty}^{\infty} \phi(x) p(x)\, dx & Continuous
\end{cases}
$$

## Variance

The variance, Var\{$X$\} is the measure of deviation of a random variable $X$ from the expectation $E\{X\}$ as determined by:

$$ \text{Var}\{X\}=E\{(X-E\{X\})^2\} $$ {#eq:varGen}

The variance characterizes the spread in values of the random variable $X$ about its expectation.

## Graphical Preliminaries

Having introduced the density function and the distribution function, it is trivial to interpret the following curves in the figure below and note, that the probability $P(X\leq x)=F(x)$ may be represented as an area between the density function $f(t)$ and the $x$-axis on the interval $-\infty<t\leq x$

![Probability as an area.^[@bronshtein2015handbook]](img/probArea.png)

Often there is given (frequently in \%) a probability value $\alpha$.

If $P(X > x) = \alpha$ holds, the corresponding value of the abscissa $x = x_\alpha$ is called the quantile or the fractile of order $\alpha$

This means the area under the density function $f(t)$ to the right of $x = x_\alpha$ is equal to $\alpha$.

**Remark:** In the literature, the area to the left of $x = x_\alpha$ is also used for the definition of quantile.

In mathematical statistics, for small values of $\alpha$, e.g., $\alpha= 5\%$ or $\alpha= 1\%$, is also used the notion
significance level of first type or type 1 error rate.

## References
