---
metaTitle: true
title: "LaTeX and JupyterHub"
subtitle: "Generating outputs locally"
publishDate: 2020-01-14
modifiedDate: 2020-01-14
blurb: Using Jupyter locally and generating outputs with tlmgr for latex
tags: [LaTeX, Jupyter, Python]
layout: article
autotoc: true
---

## LaTeX packages

Recently I shifted to using `tlmgr` to manage my `tex` installation. The
rationale behind my decision isn't relevant to this post, however, for getting a
`pdf` output some of the packages I needed are listed for ease of
re-installation:

```bash
sudo tlmgr install environ tcolorbox trimspaces adjustbox collectbox ucs titling
```

This actually highlights a caveat of the system, that is that the list of
required packages is not outputted in one go, and instead every time a
dependency is installed a new error will only be reported when the export
process is run again. Do note, however, that this is a limitation of `LaTeX`
itself and isn't really `JupyterHub`'s fault.

An issue with using the regular `print` dialog, is that the mathjax render is
not part of the output document, making it essentially useless.

Eventually to deal with the annoyance of re-runs it is actually a lot more
viable to export as a `.tex` file and then use an automated tool for grabbing
the dependencies. I personally often use
[texliveonfly](https://www.ctan.org/pkg/texliveonfly). So that works out to:

```bash
sudo tlmgr install texliveonfly
texliveonfly whatever.tex
# After this you can export via JupyterHub
```

Honestly, it is best to actually export the `.tex` and process that. When
running locally at any rate, it's almost always more annoying to work with the
browser interface.
