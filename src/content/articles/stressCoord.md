---
title: "Viscous Stress Tensor"
subtitle: "Components in Various Coordinate Systems"
author: [Rohit Goswami]
date: 2017-10-23
tags: [Pandoc, Transport-Phenomena]
fontsize: 20pt
smart: On
cleveref: On
# HTML section wise numbering
xnos-number-sections: On
# TeX section wise numbering and include esdiff
header-includes:
    - \numberwithin{figure}{section}
    - \numberwithin{equation}{section}
    - \numberwithin{table}{section}
draft: false
layout: article.njk
katex: true
autotoc: true
...

# Viscous Stress Tensor
## Vector Tensor Notation

$$ \tau=-\mu(\nabla \mathbf{v}+(\nabla \mathbf{v})^\intercal)+\left(\frac{2}{3}\mu-\kappa\right)\left(\nabla\cdot \vec{v}\right)\delta $$ {#eq:fulltau}

$\delta$ is the **unit tensor** with components $\delta_{ij}$.

$\nabla \mathbf{v}$ is the **velocity gradient tensor** with components $\dfrac{\partial}{\partial x_j}v_{ij}$.

$\nabla\cdot\vec v$ is the **divergence** of the velocity vector.

$\kappa$ is the **dilational viscosity** which is $0$ for monoatomic gases at low densities.

# FIX SIGNS FROM BIRD!!!

\newpage

## Spherical Coordinates $(r,\theta,\phi)$

$$ \tau_{rr}=\mu\left[2\frac{\partial v_r}{\partial r}-\frac{2}{3}(\nabla\cdot\vec v)\right] $$ {#eq:sph2r}

$$ \tau_{\theta\theta}=\mu\left[2\left(\frac{1}{r}\frac{\partial v_{\theta}}{\partial \theta}+\frac{v_{r}}{r}-\frac{2}{3}(\nabla\cdot\vec v) \right)\right] $$ {#eq:sph2theta}

$$ \tau_{r\theta}=\tau_{\theta r}=\mu\left[ r\frac{\partial}{\partial r}\left( \frac{v_\theta}{r} \right) + \frac{1}{r}\frac{\partial v_r}{\partial \theta} \right] $$ {#eq:sphRtheta}

$$ \tau_{\theta\phi}=\tau_{\phi\theta}=\mu\left[ \frac{\sin\theta}{r}\frac{\partial}{\partial\theta}\left( \frac{v_\phi}{\sin\theta}+ \frac{1}{r\sin\theta}\frac{\partial v_\theta}{\partial\phi} \right) \right] $$ {#eq:sphPhiTheta}

$$ \tau_{\phi r}=\tau_{r\phi}=\mu\left[ \frac{1}{r\sin\theta}\frac{\partial v_r}{\partial\phi}+r\frac{\partial}{\partial r}\left(\frac{v_\phi}{r} \right) \right] $$ {#eq:sphPhiR}

## Cylindrical Coordinates $(r,\theta,z)$

$$ \tau_{rr}=\mu\left[2\frac{\partial v_r}{\partial r} -\frac{2}{3}(\nabla\cdot v) \right] $$ {#eq:cy2r}

$$ \tau_{\theta\theta}=\mu\left[ 2\left( \frac{1}{r}\frac{\partial v_\theta}{\partial\theta} + \frac{v_r}{r} \right) - \frac{2}{3}(\nabla\cdot v) \right] $$ {#eq:cy2theta}

$$ \tau_{zz}=\mu\left[ 2\frac{\partial v_z}{\partial z}-\frac{2}{3}(\nabla\cdot v) \right] $$ {#eq:cy2z}

$$ \tau_{r\theta}=\tau_{\theta r}=\mu\left[ r\frac{\partial}{\partial r}\left( \frac{v_\theta}{r} \right) + \frac{1}{r}\frac{\partial v_r}{\partial\theta} \right] $$ {#eq:cyRtheta}

$$ \tau_{\theta z}=\tau_{z\theta}=\mu\left[\frac{\partial v_\theta}{\partial z} + \frac{1}{r}\frac{\partial v_r}{\partial\theta} \right] $$ {#eq:cyThetaZ}

$$ \tau_{zr}=\tau_{rz}=\mu\left[ \frac{\partial v_z}{\partial r}+\frac{\partial v_r}{\partial z} \right] $$ {#eq:cyZR}

## Rectangular Coordinates $(x,y,z)$

$$ \tau_{xx}=-\mu\left[ 2\frac{\partial v_x}{\partial x} - \frac{2}{3}(\nabla\cdot v) \right] $$ {#eq:rect2x}

$$ \tau_{yy}=-\mu\left[ 2\frac{\partial v_y}{\partial y} - \frac{2}{3}(\nabla\cdot v) \right] $$ {#eq:rect2y}

$$ \tau_{zz}=-\mu\left[ 2\frac{\partial v_z}{\partial z} - \frac{2}{3}(\nabla\cdot v) \right] $$ {#eq:rect2z}

$$ \tau_{xy}=\tau_{yx}=-\mu\left( \frac{\partial v_x}{\partial y} + \frac{\partial v_y}{\partial x} \right) $$ {#eq:rectxy}

$$ \tau_{yz}=\tau_{zy}=-\mu\left( \frac{\partial v_y}{\partial z} + \frac{\partial v_z}{\partial y} \right) $$ {#eq:rectyz}

$$ \tau_{xz}=\tau_{zx}=-\mu\left( \frac{\partial v_x}{\partial z} + \frac{\partial v_z}{\partial x} \right) $$ {#eq:rectxz}
