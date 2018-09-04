---
title: Working with Wayland and Sway
metaTitle: true
date: Thu Jul 30 2018 
blurb: Notes on my migration to wayland
tags: [applications, archlinux, writing]
author: [Rohit Goswami]
layout: article
autotoc: true
cleveref: On
draft: true
xnos-number-sections: On
...

## Motivation
There is really nothing wrong with the [x11 window
system](https://www.wikiwand.com/en/X_Window_System). However I read recently on
Phoronix mentioned that wayland based systems are better for power consumption
(less is better).

As my laptop had been wallowing in windows for a while now, I decided to give
wayland a go. Techinically this includes notes on setting up ArchLinux but those
are not complete nor recommended in any way. Follow the Arch Way. Use the
installation guide. Mostly these notes are to remind me why I chose a particular
package or configuration.

## Sound
Thankfully, `wayland` and `x11` both don't have anything to do with the sound
setup (mostly). Hence I kept to a tried and tested
[pulseaudio](https://wiki.archlinux.org/index.php/PulseAudio) setup to handle
all kinds of inputs. `pactl` can be bound easily to the media keys as well.

The only change I do is what I always need, a change in `/etc/libao.conf` for
[pianobar](https://github.com/PromyLOPh/pianobar) as described [here](https://bbs.archlinux.org/viewtopic.php?id=158070).

```bash
default_driver=pulse
# dev=default
quiet
```

## Window Managers
Of course the most well known of the wayland window managers is probably GNOME
now that it supports wayland, however before GNOME there was the toy DE, Weston.

None of the above are tiling window managers, so naturally they were discarded.
I decided to use the excellent sway window manager.

### Switching to Sway
Migrating from a rather customized bspwm + shxkd + lxde (session management only)
setup was surprisingly easy. I once tested i3, which sway cites as a major
influence, but I had found it to be lacking, mostly due to a lack of gaps
support (i3-gaps seemed unstable at the time).

## Finding Wayland Binaries

For a long time I was simply trying asinine methods of detecting weather I was
running a `wayland` application or an `xwayland` compatibility
version of the same. These included a common hack, namely:

1. Run `xeyes`
2. See if the eyes follow you over the window

The idea was that if 2. is true, then it's running with `xwayland`, otherwise
it's a wayland application.

However a much more robust method is:

```bash
ldd $application_path | grep wayland
```

I first became aware of this excellent method from the suggestion [here](https://stackoverflow.com/questions/43456936/determine-if-app-is-wayland-or-x-client).

This is much better since it also lets you know weather an application is just
choosing to use `xwayland` or if it really doesn't support `wayland`. (eg.
Thunar prefers `xwayland` but can be made to run natively)

## File Managers
Thunar has been my de-facto linux file manager across a host of DMs and even
distros and I was hoping that it would work out of the box. However, most GNOME
applications seem to have scant little support for wayland.

I found the file copy dialogs taking up the whole screen which was a real deal breaker.
However, with the `ldd` trick above I realized it was just not running as a
`wayland` application, which I fixed by simply adding:

```bash
# Force GTK to use wayland
GDK_BACKEND=wayland
CLUTTER_BACKEND=wayland 
```

To the appropriate startup script (or `.bashrc`, `.zshenv` etc.)

## Bluetooth Managers
For my purposes, I noted that `blueman` looked TERRIBLE. Similar to the issues
with `thunar` it insisted in opening in a split with large blurry text.
`bluedevil` had way too many dependencies which made no sense. There seemed to
be no reason to install `kwin` related packages. Eventually I settled on the
elegant yet featureful `blueberry`.

<!-- TODO Add images -->

## Finding a Bar
Though `sway` comes with it's own inbuilt `sway-bar`, the statusline
configuration is rather limited. Luckily, the cross compatibility with `i3` can
be exploited here. However, for performance and ease of configuration I opted to
forgo `i3status` and go with the performant [i3status-rust](https://github.com/greshake/i3status-rust).

Tray icon support still seems pretty limited.
 
## Ditching the mouse
Most of the mouse alternatives I use, like
[keynav](https://github.com/jordansissel/keynav) and it's enhanced forks all
rely on [xdotool](https://github.com/jordansissel/xdotool). For usage on my
laptop this is more an inconvinience since I can navigate with the trackpad and
focus shifts with the mouse cursor. However alternatives are required.

<!-- TODO add more details here-->

## Screenshots
`swaygrab`exists but generally is rather ham handed, coming from
`gnome-screenshot`, it is difficult to work with full screen images only. Must
look into `scrot` and friends.

`scrot` does not work with wayland. `swaygrab` has actually been removed in the
newer AUR package at any rate.

Luckily [grim](https://github.com/emersion/grim) seems to work perfectly.

## Wayland and browsers

Most browsers work pretty happily with `xwayland`, the `xorg` compatibility
layer. However that just seemed asinine. To the best of my knowledge most of the
system packages ([except Fedora](https://www.reddit.com/r/Fedora/comments/8n84j0/newest_firefox_supports_wayland/))
of `firefox` are not built with `wayland` support even though it is[pretty much feature-complete](https://www.phoronix.com/scan.php?page=news_item&px=Firefox-59-Wayland-Possibility). 

At any rate, the only `firefox-wayland` package on ArchLinux were to be built
from the mercurial source. After many hours of my laptop running out of memory
while compiling I finally gave up on that. Instead, it turns out there is an up
to date [Flatpack package](https://firefox-flatpak.mojefedora.cz/) for firefox
on wayland [created by](https://wiki.mozilla.org/Nightly#Is_there_a_FlatPak.2FSnap_package) the RedHat/Fedora people. Usually I am loathe to add more
package managers on a \*nix system (notably, I am strongly against
[anaconda](https://anaconda.org)), there wasn't a choice.

However, though the `flatpak` package installed and did use wayland (with
`qt-wayland` installed) it seems insanely buggy and slow. (Sat Sep  1 17:02:39
2018) Crashes were frequent and undocumented (digging into the flatpak logs
seemed like a waste of time). Currently I'm just going to stick with the normal
AUR `firefox-nightly`.



