---
metaTitle: true
layout: article
draft: false
title: Building For Android
subtitle: "Random thoughts"
blurb: Short notes
tags: [Linux, Android, ROM]
author: [Rohit Goswami]
publishDate: 2018-02-17
modifiedDate: 2018-02-17
cleveref: On
code: true
xnos-number-sections: On
autotoc: true
---

## Unlocking

The first thing to do is to unlock the bootloader. For my Xiaomi Mi A2 Lite
(codenamd `daisy`) I simply had to click on the Device name in setting until the
`Developers Options` thing was activated, then allowed OFM unlocking.

```bash
fastboot oem unlock
```
