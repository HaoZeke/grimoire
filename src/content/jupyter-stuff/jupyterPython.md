---
metaTitle: true
title: "Python and JupyterHub"
subtitle: "Managing Virtual Pythons"
publishDate: 2020-01-18
modifiedDate: 2020-01-18
blurb: Using poetry, pipenv, venv and the like to wrangle serpents
tags: [LaTeX, Jupyter, Python]
layout: article
autotoc: true
---

## Virtual Pythons

I won't go into much detail here, however, for my particular setup, other than
`nix` I will be using [poetry](https://github.com/sdispater/poetry) to keep track of my dependencies.

```{bash}
# Start the project
poetry init
# Define basic things
poetry add ipython jupyterhub ipykernel
# Use it
poetry shell
```

At this stage you should have obtained a shell with the basics of `jupyterhub`.

## Managing Kernels

An implicit assumption here is the rather counter-intuitive but practical issue
of having multiple instances of `jupyterhub` and even of `python`. So this
section will make perfect sense until everyone comes to their senses and uses `nix`:

```bash
# List kernels
jupyter kernelspec list
```

Now we can remove useless or outdated ones with a simple command:

```bash
jupyter kernelspec uninstall iHateThisKernel
```

Anyway, we really want to figure out how to get our shiny new `jupyterhub`
installation to use our nicely encapsulated `poetry` environment so let's get to
it.

```bash
# Go to directory with pyproject.toml
poetry shell
# Now make sure you get this right
which python
# /home/username/.cache/pypoetry/virtualenvs/something-string-py3.8/bin/python
exit
# Back to the system python
which python
# /usr/bin/python3.8 or whatever
# Register
python -m ipykernel install --user --name=something-string-py3.8
# Now we can select it normally from JupyterHub
```

An explanation hinges on the following facts:

- Programs like `emacs` will normally count on your system-wide `python` and
  thus by extension your system-wide `jupyterhub`
- This means when you normally run `jupyter lab` and play around with things,
  you're using your SYSTEM-PYTHON
- However the so-called fix essentially hinges on the fact that you can register
  your kernel from where-ever

The reason why this is dumb is probably obvious. It doesn't really solve the
issue of having multiple packages (at any rate you have duplicated the jupyter
package and others). At the moment though, it makes for a cleaner method than
working with just the system-python. We can still manage the environment of our
notebooks using the standard `poetry` workflow which is a plus.

The best way to fix this is to either manage the paths such that only the
`poetry` python is ever visible to everything, or to just set custom shell
environments, which will be detailed later.

## Virtual Jupyter

Another approach is to make sure you only use the `jupyter` binary to handle
registration and de-registration:

```bash
poetry shell
which jupyter # Should be the local one
# Remember that this time you need the whole path
jupyter lab
```

This is now your server which you must point every other access-mechanism to,
like `ein`. This is a cleaner approach in the sense that you no longer need to
keep a system-wide install of `jupyterhub` but now you have more restrictions on
starting the server.

<!-- ## Bonus: Sample Workflow -->

<!-- I have two distinct collaborators who insist on using the same kind of -->
<!-- packages, but I have a whole bunch of other collaborators who want different -->
<!-- packages. Meanwhile my  -->
