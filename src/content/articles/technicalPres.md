---
title: "On Technical Presentations"
subtitle: "A living guide"
blurb: "Seminar and short presentation tactics"
author: [Rohit Goswami]
date: 23-6-18
tags: [Powerpoint, Presentations, Mendeley]
fontsize: 20pt
cleveref: On
# HTML section wise numbering
xnos-number-sections: On
# TeX section wise numbering and include esdiff
header-includes:
    - \numberwithin{figure}{section}
    - \numberwithin{equation}{section}
    - \numberwithin{table}{section}
draft: false
layout: article
katex: true
autotoc: true
metaTitle: true
...


# Introduction

I've structured this guide to distinguish between actionable aid and ideas as best possible. Hence material aids refer to things you need to go through or understand. The intangible aids are suggestions, basically, along with a rough guide to using these.


## Workflow

The work-flow is mainly for those without access to Pandoc, or a full TeX install and need to use the web or windows.

This involves heavy usage of typical windows stuff, like Overleaf or MikTeX or PowerPoint.

If you're on a \*nix system, use the [zenYoda](https://github.com/HaoZeke/zenYoda_Starter) system instead.

## Research and Presenting

Additionally this article includes general observations to produce a good presentation. (insofar as I am able to judge)

# Material Aid

Basically you'll want to prep a reference file and collect data. 
I'll also briefly mention usage patterns.


## Papers and Books

It's expedient, though, not exactly legal to keep research materials on some sort of online storage. I prefer [box](https://app.box.com).

As always, additional stuff may be obtained from [Google Scholar](https://scholar.google.com) in conjunction with with [Libgen.io](http://libgen.io/) {Don't forget to choose `Scientific Articles` if you're looking for articles.}

## Overleaf (Beamer)

In case you want to use a template for making the presentation, or rather if you make it with `beamer`, you'll need to first make minor modifications to a template, basically add references.

You can carry on with that setup [here on Overleaf](https://www.overleaf.com/latex/templates/metropolis-beamer-theme/qzyvdhrntfmr).

If you need to add more references then you need to search on Google Scholar and pick Bibtex in the citation format (click on the " button) and add that to the references file. {`demo.bib`}

## Powerpoint

In case you decide to go for a Powerpoint presentation, you can find some nice free templates [here on SlidesCarnival](https://www.slidescarnival.com/).

In that case you'll want to either manually add the references by choosing one of the text styles with google scholar (I prefer the APA but they're all good**.

*Please* ensure you learn how to use the **align** submenu of the
**arrange**button. [Home tab]

*Always* keep the **ruler** and **gridlines** on during the design phase.
[View tab]

### Mendeley

Actually if you go for Powerpoint then use Mendeley instead for managing references, they have a nice plugin.

For the plugin of course you'll need the [desktop app from here](https://www.mendeley.com/download-desktop/).

To use Mendeley, you'll need to add the articles or papers into it by simply dragging and dropping them.
You can also use the web citation manager but that won't actually store a copy of the paper which can be problematic.

# Ideas and Intangible Aid

## Presenting

Based on my experiences presenting I would suggest the following:

### General Observations

* Focus on clarifying the basics
* Choose a few topics to focus on (or even one)
* Mention clearly multiple use cases, and stress you're only uncovering the tip of the iceberg
* Stay away from derivations
* Try for at-least one picture a slide
* Don't cram too much text
* Don't put full sentences
* Make a modular presentation so you can skip entire sections or include them without breaking the flow
* Introduce the flow of the presentation, highlighting aspects you might brush over briefly (maybe not for college)

### Program Specific Details

* With beamer especially, the headings are really useful
* You may structure content under a single heading over many slides by using a Title - Number format
* With Powerpoint, try to maintain a basic structural layout, expect for a few call-out slides

### Citations

* Stick to a consistent reference pattern, either on the slide itself (`\footcite` style, i.e footnotes) or at the end (master reference style)
* If you need `\nocite` citations (citations used multiply, like books) put those at the end (master reference)
* Review articles may also be master refs, but remember to reference images too
* Technical articles mentioned only once are typically footcited

## Researching

More an art than an exploratory methodology, I would still suggest the following for presenting (at-least in college):

* Use the introductory chapters from the books
* Use the Review articles for future trends
* Focus on a few technical aspects
* Don't cram too many details
* Don't be overly specific
* Put only pretty equations
* A picture says a thousand words, but an equation conveys whole realms of knowledge
* Remember to prompt basic questions and answer them within the presentation (gently)

Furthermore I ought to stress the avoidance of the following:

* Googling (unless as a last resort)

Google above refers to the base search including crap like Quora, StackExchange etc. Google only when you don't know the field to search

Also in general:

* Always read the wiki references
* Try to gauge the momentum of the field
* Don't hype old tech
* Celebrate tech maturity instead

This is actually a bit of a living (evolving) guide (insofar as non binding suggestions are a guide).

**Rohit Goswami**
 
*BTech Year IV | HBTU Kanpur | ChemE Dept.*

<p align="left">
S: rohit.646<br>
E: r95g10[at]gmail.com
</p> 
