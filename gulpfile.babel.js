import gulp from "gulp";
import ms from "gulp-metalsmith";
import watcher from "gulp-watch";
import imagemin from "gulp-imagemin";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import newer from "gulp-newer";
import tap from "gulp-tap";
import gutil from "gulp-util";
import buffer from "gulp-buffer";
import typeset from "gulp-typeset";
import typogr from "gulp-typogr";
import gap from "gulp-append-prepend";
import insert from "gulp-insert";
import concat from "gulp-concat";
import gfavicon from "gulp-real-favicon";
import gcopy from "gulp-copy";
import gif from "gulp-if";
import gfilter from "gulp-filter";
import htmlMin from "gulp-htmlmin";
import csso from "gulp-csso";
import postcss from "gulp-postcss";
import fontmin from "gulp-fontmin";
import uncss from "uncss";
import ap from "autoprefixer";
import postscss from "postcss-scss";
import rucksack from "rucksack-css";
import fontMagician from "postcss-font-magician";
import mspmd from "metalsmith-pandoc";
import msc from "metalsmith-auto-collections";
import mslay from "metalsmith-layouts";
import msperma from "metalsmith-permalinks";
import drafts from "metalsmith-drafts";
import metallic from "metalsmith-metallic";
import msroot from "metalsmith-rootpath";
import msmath from "metalsmith-mathjax";
import mstags from "metalsmith-tags";
import msatoc from "metalsmith-autotoc";
import msdate from "metalsmith-date-formatter";
import msaddExt from "metalsmith-layouts-add-extension";
import mslogger from "metalsmith-logger";
import msmap from "metalsmith-sitemap";
import mscanon from "metalsmith-canonical";
import msrobot from "metalsmith-robots";
import webpackStream from "webpack-stream";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import babelMinify from "babel-minify-webpack-plugin";
import nun from "nunjucks";
import nunMark from "nunjucks-markdown";
import bs from "browser-sync";
import browserify from "browserify";
import yargs from "yargs";
import path from "path";
import fs from "fs";

const arg = yargs
  // Production Flag
  .alias("p", "production")
  .describe("p", "optimize and generate pdfs")
  //  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .help("help")
  .alias("u", "uncss")
  .describe("u", "runs uncss")
  //  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .help("help").argv;

// Paths for futureproof directory changes
const paths = {
  contentFrom: {
    root: "src/",
    src: "src/md/",
    conf: "src/conf/",
    tex: "src/tex/",
    js: "src/assets/js/",
    images: "src/assets/images/",
    templates: "src/templates/",
    faviconData: "faviconData.json",
    faviconImage: "src/assets/static/girmoire.jpg",
    layouts: {
      fullPath: "src/layouts/",
      ms: "layouts/"
    },
    helpers: {
      fullPath: "src/helpers/",
      ms: "helpers/"
    },
    partials: {
      fullPath: "src/partials/",
      ms: "partials/"
    }
  },
  outputTo: {
    root: "dist/",
    src: "src/",
    images: {
      pre: "src/assets/images/",
      post: "dist/img/"
    },
    pdf: "dist/pdf/",
    doc: "dist/doc/",
    js: "dist/js/",
    styles: "dist/css/",
    tex: "src/tex/",
    ref: "src/refs.bib"
  },
  watchFor: {
    md: "src/content/**/*.md",
    conf: "src/conf/**/*.yml",
    filters: "src/filters/**/*.py",
    layouts: "src/layouts/**/*",
    partials: "src/partials/**/*",
    refs: "src/content/**/*.bib",
    tex: "src/tex/**/*.tex",
    latexmkConf: "src/conf/.latexmkrc",
    styles: "src/assets/styles/**/*.scss",
    html: "dist/**/*.html",
    js: {
      main: "src/assets/js/main.js",
      bundle: "src/assets/js/**/*.js"
    },
    images: {
      pre: "src/content/**/*.{jpg,jpeg,png}",
      post: "src/assets/images/**/*.{jpg,jpeg,png}"
    },
    gulp: "src/content/**/*",
    static: "src/assets/static/**/*"
  }
};

var webpackSettings = {
  entry: {
    app: [
      "webpack/hot/dev-server",
      "webpack-hot-middleware/client",
      path.join(process.cwd(), paths.contentFrom.js, "main.js")
    ]
  },
  output: {
    path: path.join(process.cwd(), paths.outputTo.js),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" }
      // { test: /\.ts$/, use: 'ts-loader' }
    ]
  }
};

var webpackerSettings = {
  entry: {
    app: [path.join(process.cwd(), paths.contentFrom.js, "main.js")]
  },
  output: {
    path: path.join(process.cwd(), paths.outputTo.js),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  plugins: [new babelMinify(), new webpack.NoEmitOnErrorsPlugin()]
};

const bundler = webpack(webpackSettings);

// Workaround to processing each .bib file
export function refs() {
  return gulp
    .src(paths.watchFor.refs)
    .pipe(newer(paths.outputTo.ref))
    .pipe(concat("refs.bib"))
    .pipe(gulp.dest(paths.outputTo.src));
}

// Get fonts
export function fonts() {
  return gulp
    .src("node_modules/font-awesome/fonts/*.ttf")
    .pipe(fontmin())
    .pipe(gulp.dest("dist/fonts/"));
}

// Workaround to processing each image
export function preimg() {
  return gulp
    .src(paths.watchFor.images.pre)
    .pipe(gcopy(paths.contentFrom.images, { prefix: 9 }));
}

export function metal(cb) {
  nun.configure(
    [paths.contentFrom.layouts.fullPath, paths.contentFrom.partials.fullPath],
    { watch: false }
  );

  const htmlOnly = gfilter(["**/*.html"], { restore: true });
  // const seoFiles = gfilter(['**/*.xml','**/robots.txt'], {restore:true});
  const fullSite = gfilter(["**/*.html", "**/*.xml", "**/robots.txt"], {
    restore: false
  });

  gulp.src("src/keybase.txt").pipe(gulp.dest(paths.outputTo.root));

  return gulp
    .src(paths.watchFor.gulp)
    .pipe(
      ms({
        // Metalsmith's root directory, for example for locating templates, defaults to CWD
        root: paths.contentFrom.root,
        // Don't delete stuff
        clean: false,
        // Files to exclude from the build
        ignore: ["src/*.tmp"],
        // Parsing frontmatter, defaults to true
        frontmatter: true,
        // Metalsmith plugins to use:
        use: [
          // Add ext
          msaddExt({
            layout_extension: ".njk"
          }),

          // Drafts
          drafts(),

          // Synatax Highlighting
          metallic(),

          // Pandoc Markdown
          mspmd({
            from: "markdown",
            to: "html5",
            args: [
              "--katex",
              "--filter",
              "pandoc-eqnos",
              "--filter",
              "pandoc-citeproc",
              "--filter",
              "pandoc-fignos",
              "--bibliography",
              paths.outputTo.ref
            ],
            opts: {},
            pattern: "**/*.md", // multimatch
            ext: ".html" // extension for output file
          }),

          // TOC JSON for headings
          msatoc({
            selector: "h2, h3, h4, h5, h6",
            headerIDPrefix: "subhead"
          }),

          // Check the autotoc
          mslogger(["title", "tags", "toc"]),

          // Try Math rendering
          msmath(),

          // Collections
          msc({
            pattern: ["**/*.html", "!*.html"]
          }),

          msperma({
            relative: false,
            pattern: ":title"
          }),

          // Tags
          mstags({
            // yaml key for tag list in you pages
            handle: "tags",
            path: "topics/:tag/index.html",
            pathPage: "topics/:tag/:num/index.html",
            perPage: 6,
            // path for result pages
            // path:'topics/:tag.html',
            // layout to use for tag listing
            layout: "tags.njk",
            // provide posts sorted by 'date' (optional)
            sortBy: "date",
            // sort direction (optional)
            reverse: true,
            // skip updating metalsmith's metadata object.
            // useful for improving performance on large blogs
            // (optional)
            skipMetadata: false,
            // Use a non-default key in the metadata. Useful if you you want to
            // have two sets of tags in different sets with metalsmith-branch.
            metadataKey: "category",
            // Any options you want to pass to the [slug](https://github.com/dodo/node-slug) package.
            // Can also supply a custom slug function.
            // slug: function(tag) { return tag.toLowerCase() }
            slug: { mode: "rfc3986" }
          }),

          // Use a pathroot
          msroot(),

          // Use a good date formatter
          msdate({
            dates: ["date", "publishDate", "modifiedDate"]
          }),

          // Template engine
          mslay({
            engine: "nunjucks",
            default: "default.njk"
          }),

          // Add a canonical url
          mscanon({
            hostname: "https://grimoire.science"
          }),

          // Add a sitemap
          msmap({
            hostname: "https://grimoire.science"
          }),

          // Add robots
          msrobot({
            sitemap: "https://grimoire.science/sitemap.xml"
          })

          // function(files, ms, done) {
          // 	console.log('Files: ');
          // 	console.log(files);
          // 	console.log();
          // 	console.log('Metalsmith ');
          // 	console.log(ms);
          // 	done();
          // }
        ],
        // Initial Metalsmith metadata, defaults to {}
        metadata: {
          name: "Grimoire",
          description:
            "A pseudo magic collection of thoughts and ideas. Mainly focused on code and chemical engineering."
        }
        // List of JSON files that contain page definitions
        // true means "all JSON files", see the section below
        //json: ['src/pages.json']
      })
    )
    .pipe(htmlOnly)
    .pipe(
      typeset({
        ignore: ".math"
      })
    )
    .pipe(typogr())
    .pipe(gif(arg.p == true, htmlMin({ collapseWhitespace: true })))
    .pipe(htmlOnly.restore)
    .pipe(fullSite)
    .pipe(gulp.dest(paths.outputTo.root))
    .pipe(bs.stream());
  cb();
}

// Compile sass into CSS & auto-inject into browsers
export function mkcss() {
  return gulp
    .src(paths.watchFor.styles)
    .pipe(newer(paths.outputTo.styles))
    .pipe(gif(arg.p != true, sourcemaps.init()))
    .pipe(
      postcss(
        [
          rucksack(),
          ap({
            browsers: ["last 2 versions"]
          }),
          fontMagician()
        ],
        { syntax: postscss }
      )
    )
    .pipe(
      sass({
        includePaths: [
          "node_modules",
          "node_modules/breakpoint-sass/stylesheets/",
          "node_modules/breakpoint-slicer/stylesheets/",
          "node_modules/typi/scss/",
          "node_modules/animate-sass/",
          "node_modules/normalize.scss/",
          "node_modules/highlightjs/styles/",
          "node_modules/luxbar/scss/",
          "node_modules/font-awesome/scss/",
          "node_modules/hamburgers/_sass/hamburgers/",
          "node_modules/reflex-grid/scss/"
        ]
      }).on("error", sass.logError)
    )
    .pipe(
      gif(
        arg.u == true,
        postcss([
          uncss.postcssPlugin({
            html: ["dist/**/*.html"],
            ignore: [
              ".is-active",
              "*.is-active",
              ".hamburger--collapse",
              ".hamburger-*",
              ".hamburger-inner",
              ".hamburger",
              ".hamburger-box",
              ".hamburger--collapse-r.is-active",
              ".hamburger--collapse.is-active",
              ".hamburger--collapse-r",
              ".hamburger--collapse.is-active",
              ".hamburger-inner::before",
              ".hamburger-inner::after",
              '[aria-expanded="true"].minimalist-accordion__header',
              "luxbar-hamburger-doublespin"
            ]
          })
        ])
      )
    )
    .pipe(csso())
    .pipe(gif(arg.p != true, sourcemaps.write("./")))
    .pipe(gulp.dest(paths.outputTo.styles))
    .pipe(bs.stream());
}

export function images() {
  return gulp
    .src(paths.watchFor.images.post)
    .pipe(newer(paths.outputTo.images.post)) // pass through newer images only
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{ removeViewBox: true }]
      })
    )
    .pipe(gulp.dest(paths.outputTo.images.post))
    .pipe(bs.stream());
}

export function webpacker() {
  return gulp
    .src(paths.watchFor.js.main)
    .pipe(webpackStream(webpackerSettings))
    .pipe(gulp.dest(paths.outputTo.js));
}

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
export function favicons(done) {
  if (arg.p === true) {
    gfavicon.generateFavicon(
      {
        masterPicture: paths.contentFrom.faviconImage,
        dest: paths.outputTo.root,
        iconsPath: "/",
        design: {
          ios: {
            pictureAspect: "noChange",
            assets: {
              ios6AndPriorIcons: false,
              ios7AndLaterIcons: false,
              precomposedIcons: false,
              declareOnlyDefaultIcon: true
            }
          },
          desktopBrowser: {},
          windows: {
            pictureAspect: "noChange",
            backgroundColor: "#2b5797",
            onConflict: "override",
            assets: {
              windows80Ie10Tile: false,
              windows10Ie11EdgeTiles: {
                small: false,
                medium: true,
                big: false,
                rectangle: false
              }
            }
          },
          androidChrome: {
            pictureAspect: "noChange",
            themeColor: "#ffffff",
            manifest: {
              display: "standalone",
              orientation: "notSet",
              onConflict: "override",
              declared: true
            },
            assets: {
              legacyIcon: false,
              lowResolutionIcons: false
            }
          }
        },
        settings: {
          scalingAlgorithm: "Mitchell",
          errorOnImageTooSmall: false
        },
        markupFile: paths.contentFrom.faviconData
      },
      function() {
        done();
      }
    );
  }
  return done();
}

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
export function injectFavicons(done) {
  if (arg.p === true) {
    gulp
      .src(paths.watchFor.html)
      .pipe(
        gfavicon.injectFaviconMarkups(
          JSON.parse(fs.readFileSync(paths.contentFrom.faviconData)).favicon
            .html_code
        )
      )
      .pipe(gulp.dest(paths.outputTo.root));
  }
  return done();
}

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
export function updateFavicons(done) {
  if (arg.p === true) {
    var currentVersion = JSON.parse(
      fs.readFileSync(paths.contentFrom.faviconData)
    ).version;
    gfavicon.checkForUpdates(currentVersion, function(err) {
      if (err) {
        throw err;
      }
    });
  }
  return done();
}

// Rerun the task when a file changes
export function watch() {
  bs({
    server: {
      baseDir: paths.outputTo.root,
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackSettings.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    }
  });
  watcher(paths.watchFor.styles, gulp.series(mkcss));
  watcher(paths.watchFor.images.pre, gulp.series(preimg, images));
  // watcher(paths.watchFor.js.bundle, gulp.series(webpacker, browserReload));
  watcher(
    [
      paths.watchFor.md,
      paths.watchFor.partials,
      paths.watchFor.layouts,
      paths.watchFor.conf
    ],
    gulp.series(refs, metal, browserReload)
  );
}

export function browserReload() {
  return bs.reload();
}

function build(done) {
  return gulp.series(
    gulp.parallel(refs, preimg),
    gulp.parallel(metal, images, fonts, webpacker),
    mkcss,
    favicons,
    injectFavicons
  )(done);
}

exports.default = build;
