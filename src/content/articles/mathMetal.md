---
title: "Metalsmith Math"
date: 2016-10-12
blurb: Various math rendering methods in metalsmith
layout: article
---

## MathJax

Implemented here via the `metalsmith-mathjax` plugin.

* Typically considered slower to load than [KaTeX](https://www.intmath.com/cg5/katex-mathjax-comparison.php)
* Adding `mathjax: true` to the metadata will **prerender** math to svg
* Prerendering is *fast* but **increases** the page size significantly

## KaTeX

Implemented here via CDN scripts.

* Loads faster than [MathJax](https://www.intmath.com/cg5/katex-mathjax-comparison.php)
* Consists of a *subset* of TeX (typically enough to use)
* Implemented here by adding `katex: true` to the metadata
* However, this includes a multitude of fonts
* Overall size is not much reduced for sites with less equations

## Stats

For the same [document](/viscous-stress-tensor), the details are:

+---------+-----------+---------------------+-----------+-------+------+------+
|  Engine | Page Size |JS Load              | Font Load | Total | Time | DOM  |
|         |      (kB) |          (kB)       |      (kB) |  (kB) | (ms) | (ms) |
+---------+-----------+---------------------+-----------+-------+------+------+
| MathJax | ~200      | None                | None      | 200   | 753  | 327  |
+---------+-----------+---------------------+-----------+-------+------+------+
| KaTeX   | ~10       | katex.min.js (54.7) | 121.3     | 189.8 | 535  | 403  |
|         |           | auto-render (3.8)   |           |       |      |      |
+---------+-----------+---------------------+-----------+-------+------+------+

## Conclusions

* **Lots** of equations, use **KaTeX**
* **Else** use **MathJaX**