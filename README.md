# Grimoire  [![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://www.paypal.me/HaoZeke/) [![Greenkeeper badge](https://badges.greenkeeper.io/HaoZeke/grimoire.svg)](https://greenkeeper.io/) [![Build Status](https://semaphoreci.com/api/v1/haozeke/grimoire/branches/master/badge.svg)](https://semaphoreci.com/haozeke/grimoire) 

> Copyright (C) 2017  Rohit Goswami <rohit1995@mail.ru>

![](src/assets/images/grimoire.jpg "Compendium of thoughts")

My personal take on educational notes.

Built with metalsmith.

## Writing
All bibliography files under content will be processed and available for citation purposes.

**DO NOT** add anything to `refs.bib`, as this is over-written at every build.

As the site runs through typogr, write fractions as \frac{x{s}}{2} instead of \frac{x s}{2} when inlined.

ie. no spaces in in-lined elements.

## Flags

```bash
-u, --uncss
#Runs uncss (needs html to be generated previously)
-p, --prod
#Doesn't write sourcemaps and uglifies 
```

## Acknowledgments
This software is built on the following:

- [Pandoc](https://github.com/jgm/pandoc)
- [TeX](https://ctan.org/)
- [tup](http://gittup.org/tup/index.html)
- [Metropolis](https://github.com/matze/mtheme)
- [latexmk](http://mg.readthedocs.io/latexmk.html)
- [shx](https://github.com/shelljs/shx)
- [yarn](https://yarnpkg.com/en/)

Additionally, for the site the following tools were used:

- [sassc](https://github.com/sass/sassc)
- [node-sass](https://github.com/sass/node-sass)
- [surge](http://surge.sh)
- [panflute](http://scorreia.com/software/panflute/)
- [imagemin-cli](https://github.com/imagemin/imagemin-cli)

The site is built with:

- [Sass](http://sass-lang.com/)
- [CSS Gird](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)
- [Travis CI](https://travis-ci.org)

## Contributions
Pull requests welcome!

Please add yourself to the Contributors file as well, with a summary and contact details (optional).

## Issues
Bug tracking is done with [waffle.io](https://waffle.io/)

Here bug tracking also includes content requests.

<!-- [![Waffle.io - Columns and their card count](https://badge.waffle.io/HaoZeke/zenYoda.svg?columns=all)](https://waffle.io/HaoZeke/zenYoda) -->

## License
The code itself is under the [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) like much of pandoc itself, however, please refer to the exceptions listed [here](https://github.com/jgm/pandoc/blob/master/COPYRIGHT).

Content is mine, except when explicitly mentioned and is under the [CC BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)