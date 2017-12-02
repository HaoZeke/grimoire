import gulp from 'gulp';
import ms from 'gulp-metalsmith';
import watcher from 'gulp-watch';
import imagemin from 'gulp-imagemin';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import newer from 'gulp-newer';
import tap from 'gulp-tap';
import gutil from 'gulp-util';
import buffer from 'gulp-buffer';
import uglify from 'gulp-uglify';
import typeset from 'gulp-typeset';
import typogr from 'gulp-typogr';
import gap from 'gulp-append-prepend';
import insert from 'gulp-insert';
import concat from 'gulp-concat';
import gcopy from 'gulp-copy';
import gif from 'gulp-if';
import csso from 'gulp-csso';
import postcss from 'gulp-postcss';
import uncss from 'uncss';
import ap from 'autoprefixer';
import postscss from 'postcss-scss';
import rucksack from 'rucksack-css';
import fontMagician from 'postcss-font-magician';
import mspmd from 'metalsmith-pandoc';
import msc from 'metalsmith-auto-collections';
import mslay from 'metalsmith-layouts';
import msperma from 'metalsmith-permalinks';
import drafts from 'metalsmith-drafts';
import metallic from 'metalsmith-metallic';
import msroot from 'metalsmith-rootpath';
import msmath from 'metalsmith-mathjax';
import mstags from 'metalsmith-tags';
import msatoc from 'metalsmith-autotoc';
import msaddExt from 'metalsmith-layouts-add-extension';
import bs from 'browser-sync';
import browserify from 'browserify';
import nun from 'nunjucks';
import nunMark from 'nunjucks-markdown';
import yargs from 'yargs';

const arg = yargs
// Production Flag
.alias('p', 'production')
  .describe('p', 'optimize and generate pdfs')
//  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .help('help')
.alias('u', 'uncss')
  .describe('u', 'runs uncss')
//  .choices('i', ['peanut-butter', 'jelly', 'banana', 'pickles'])
  .help('help')
  .argv;


// Paths for futureproof directory changes
const paths = {
  contentFrom: {
    root: 'src/',
    src: 'src/md/',
    conf: 'src/conf/',
    tex: 'src/tex/',
    js: 'src/assets/js/',
    images: 'src/assets/images/',
    templates: 'src/templates/',
    layouts: {
      fullPath: 'src/layouts/',
      ms: 'layouts/'
    },
    helpers: {
      fullPath: 'src/helpers/',
      ms: 'helpers/'
    },
    partials: {
      fullPath: 'src/partials/',
      ms: 'partials/'
    }
  },
  outputTo: {
    root: 'dist/',
    src: 'src/',
    images: {
      pre: 'src/assets/images/',
      post: 'dist/img/'
    },
    pdf: 'dist/pdf/',
    doc: 'dist/doc/',
    js: 'dist/js/',
    styles: 'dist/css/',
    tex: 'src/tex/',
    ref: 'src/refs.bib'
  },
  watchFor: {
    md: 'src/content/**/*.md',
    conf: 'src/conf/**/*.yml',
    filters: 'src/filters/**/*.py',
    layouts: 'src/layouts/**/*',
    partials: 'src/partials/**/*',
    refs: 'src/content/**/*.bib',
    tex: 'src/tex/**/*.tex',
    latexmkConf: 'src/conf/.latexmkrc',
    styles: 'src/assets/styles/**/*.scss',
    js: {
      main: 'src/assets/js/main.js',
      bundle: 'src/assets/js/**/*.js'
    },
    images: {
      pre: 'src/content/**/*.{jpg,jpeg,png}',
      post: 'src/assets/images/**/*.{jpg,jpeg,png}'
    },
    gulp: 'src/content/**/*',
    static: 'src/assets/static/**/*'
  }
}

// Workaround to processing each .bib file
export function refs() {
  return gulp.src(paths.watchFor.refs)
    .pipe(newer(paths.outputTo.ref))
    .pipe(concat('refs.bib'))
    .pipe(gulp.dest(paths.outputTo.src))
}


// Workaround to processing each image
export function preimg() {
  return gulp.src(paths.watchFor.images.pre)
    .pipe(gcopy(paths.contentFrom.images,{ prefix: 9 }))
}

export function metal(cb) {
  nun.configure([paths.contentFrom.layouts.fullPath,
    paths.contentFrom.partials.fullPath], {watch: false});
return gulp.src(paths.watchFor.gulp)
  .pipe(
    ms({
      // Metalsmith's root directory, for example for locating templates, defaults to CWD 
      	root: paths.contentFrom.root,
      // Don't delete stuff
      	clean: false,
      // Files to exclude from the build 
      	ignore: ['src/*.tmp'],
      // Parsing frontmatter, defaults to true 
      	frontmatter: true,
      // Metalsmith plugins to use: 
	    use: [

        // Add ext
        msaddExt({
          layout_extension: '.njk',
        }),

        // Drafts
        drafts(),

        // Synatax Highlighting
        metallic(),

   	  	// Pandoc Markdown
        mspmd({
        	from: 'markdown',
		    to:   'html5',
		    args: ['--katex',
        '--filter','pandoc-eqnos',
        '--filter','pandoc-citeproc',
        '--bibliography',paths.outputTo.ref],
			  opts: {},
			  pattern: '**/*.md', // multimatch
			  ext: '.html' // extension for output file
			}),

        // TOC JSON for headings
        msatoc({
          selector: "h2, h3, h4, h5, h6",
          headerIDPrefix: 'subhead'
        }),

      // Try Math rendering
      msmath(),

	    // Collections
	    msc({
	    	pattern: ['**/*.html', '!*.html'],
	    }),
	    
      msperma({
	    	relative: false,
	    	pattern: ':title'
	    }),

      // Tags
      mstags({
        // yaml key for tag list in you pages
        handle: 'tags',
        path: "topics/:tag/index.html",
        pathPage: "topics/:tag/:num/index.html",
        perPage: 6,
        // path for result pages
        // path:'topics/:tag.html',
        // layout to use for tag listing
        layout:'tags.njk',
        // provide posts sorted by 'date' (optional)
        sortBy: 'date',
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
        slug: {mode: 'rfc3986'}
      }),

        // Use a pathroot
        msroot(),

        // Template engine
        mslay({
        	engine: 'nunjucks',
        	default: 'default.njk'
        }),
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
        site_name: 'Grimoire'
      },
      // List of JSON files that contain page definitions 
      // true means "all JSON files", see the section below 
      //json: ['src/pages.json']
    }))
    .pipe(typeset({
      ignore: '.math'
    }))
    .pipe(typogr())
  	.pipe(gulp.dest(paths.outputTo.root))
  	.pipe(bs.stream());
cb();
};

// Compile sass into CSS & auto-inject into browsers
export function mkcss() {
    return gulp.src(paths.watchFor.styles)
      .pipe(newer(paths.outputTo.styles))
      .pipe(gif(arg.p != true, sourcemaps.init()))
      .pipe(postcss([
        rucksack(),
        ap({
          browsers: ['last 2 versions']
        }),
        fontMagician()
      ], {syntax: postscss}))
      .pipe(sass({
        includePaths: [
        'node_modules',
        'node_modules/breakpoint-sass/stylesheets/',
        'node_modules/breakpoint-slicer/stylesheets/',
        'node_modules/typi/scss/',
        'node_modules/animate-sass/',
        'node_modules/normalize.scss/',
        'node_modules/highlightjs/styles/',
        'node_modules/luxbar/scss/',
        'node_modules/hamburgers/_sass/hamburgers/'
        ],
      }).on('error', sass.logError))
      .pipe(gif(arg.u == true, (postcss([
        uncss.postcssPlugin({
        html: ['dist/**/*.html'],
        ignore: ['.openBurger','.burger',
        '[aria-expanded="true"].minimalist-accordion__header',
        'luxbar-hamburger-doublespin']
      })
        ]))))
      .pipe(csso())
      .pipe(gif(arg.p != true, sourcemaps.write('./')))
      .pipe(gulp.dest(paths.outputTo.styles))
      .pipe(bs.stream());
};

export function images() {
  return gulp.src(paths.watchFor.images.post)
    .pipe(newer(paths.outputTo.images.post))  // pass through newer images only
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
    .pipe(gulp.dest(paths.outputTo.images.post))
    .pipe(bs.stream());
};

export function js() {
  return gulp.src(paths.watchFor.js.main, {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
 //   .pipe(newer(paths.outputTo.js))
    .pipe(tap(function (file) {

      gutil.log('bundling ' + file.path);

      // replace file contents with browserify's bundle stream
      file.contents = browserify(file.path, {
        debug: true,
        // transform: ["rollupify", "babelify" ]
      }).bundle();

    }))

    // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
    .pipe(buffer())

    // load and init sourcemaps
    .pipe(gif(arg.p != true, sourcemaps.init({loadMaps: true})))

    .pipe(gif(arg.p == true,uglify()))

    // write sourcemaps
    .pipe(gif(arg.p != true, sourcemaps.write('./')))

    .pipe(gulp.dest(paths.outputTo.js))
    .pipe(bs.stream());
};

// Rerun the task when a file changes
export function watch() {
  bs.init({
    server: paths.outputTo.root
  });
  watcher(paths.watchFor.styles, gulp.series(mkcss));
  watcher(paths.watchFor.images.pre, gulp.series(preimg, images));
  watcher(paths.watchFor.js.bundle, gulp.series(js));
  watcher([
    paths.watchFor.md,
    paths.watchFor.partials,
    paths.watchFor.layouts,
    paths.watchFor.conf
    ],
    gulp.series(refs, metal));
};


export default gulp.series(gulp.parallel(refs, preimg), gulp.parallel(metal, images, js), mkcss);