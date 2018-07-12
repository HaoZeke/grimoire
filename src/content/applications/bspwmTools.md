---
title: Living with bspwm
metaTitle: true
date: Thu Jul 12 2018 
blurb: A romance in binary space partitioning.
tags: [applications, tricks, writing]
author: [Rohit Goswami]
layout: article
autotoc: true
cleveref: On
draft: true
xnos-number-sections: On
...

## Get the window name
Setting rules for `bspwm` is actually very straightforward, assuming one knows
the exact window title.

To get this, it's often easiest to just use
[xprop](https://xorg.freedesktop.org/wiki/).

This allows for a workflow as simple as running this command and clicking the
application window in question.

```bash
xprop | grep WM_CLASS
```

This works best when combined with a scratchpad style dropdown terminal.
