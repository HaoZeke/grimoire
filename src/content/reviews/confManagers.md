---
metaTitle: true
title: Configuration Management
publishDate: 2018-07-10
blurb: Testing SaltStack, Fabric, Ansible, Chef and Puppet.
tags: [configuration, reviews, writing]
author: [Rohit Goswami]
layout: article
autotoc: true
cleveref: On
draft: true
xnos-number-sections: On
---

The basic problem with working from various locations and with a bunch of
computers is that, well, `dotfiles` are not enough.

Assuming a common OS and a uniform set of installed packages, there's nothing
better than setting up a `dotfile` management system which will be compared
elsewhere.

However, in most cases, there is a **lot** of configuration to be done before
you can use a setup, even [one like this one](https://github.com/HaoZeke/Dotfiles).

For managing a bunch of computers, usually a `devops` tool is used for
configuration management, in terms of getting the right packages in a uniform
and consistent way.

The most popular ones as of this writing seem to be:

- [Ansible](https://www.ansible.com/)
- [SaltStack](https://saltstack.com/)
- [Chef](https://www.chef.io/chef/)
- [Puppet](https://puppet.com/)
- [Fabric](http://www.fabfile.org/)

As an [archLinux](https://www.archlinux.org/) user, even most \*nix systems don't usually have the right set of
packages which means this sort of higher level package management is imperative.

## SaltStack

![](/img/saltLogo.jpg)
