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
import postcss from 'gulp-postcss';
import typeset from 'gulp-typeset';
import typogr from 'gulp-typogr';
import gap from 'gulp-append-prepend';
import insert from 'gulp-insert';
import concat from 'gulp-concat';
import gcopy from 'gulp-copy';
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

const paths = {
	ms: {
		src: 'src/',
		dest: 'dist/'
	},
	md: {
		src: 'src/content/',
		dest: 'dist/'
	},
	styles: {
	 src: 'src/assets/styles/**/*.scss',
	 dest: 'dist/css/'
	},
	images: {
	  src: 'src/assets/images/**/*.{jpg,jpeg,png}',
	  dest: 'dist/img/'
	},
	scripts: {
	  src: 'src/assets/js/main.js',
	  dest: 'dist/js/'
	},
  refs: 'src/refs.bib',
	layouts: {
		src: 'layouts/',
		partials: 'partials/',
		helpers: 'src/helpers/'
	}
};


// Workaround to processing each .bib file
export function refs() {
  return gulp.src('./src/content/**/*.bib')
    .pipe(newer(paths.refs))
    .pipe(concat('refs.bib'))
    .pipe(gulp.dest('src/'))
}


// Workaround to processing each image
export function preimg() {
  return gulp.src('./src/content/**/*.{jpg,jpeg,png}')
    .pipe(gcopy('./src/assets/images/',{ prefix: 9 }))
    .pipe(gulp.dest('./src/assets/images/'))
}

export function metal(cb) {
  nun.configure(['./src/layouts','./src/partials'], {watch: false});
return gulp.src('src/content/**')
  .pipe(
    ms({
      // Metalsmith's root directory, for example for locating templates, defaults to CWD 
      	root: paths.ms.src,
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
		    args: ['--katex','--filter','pandoc-eqnos','--filter','pandoc-citeproc','--bibliography',paths.refs],
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
  	.pipe(gulp.dest(paths.md.dest))
  	.pipe(bs.stream());
cb();
};

// Compile sass into CSS & auto-inject into browsers
export function mkcss() {
    return gulp.src(paths.styles.src)
      .pipe(newer(paths.styles.dest))
      .pipe(sourcemaps.init())
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
        outputStyle: 'expanded'
      }).on('error', sass.logError))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(bs.stream());
};

export function images() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))  // pass through newer images only
    .pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(bs.stream());
};

export function scripts() {

  return gulp.src(paths.scripts.src, {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
    .pipe(newer(paths.scripts.dest))
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
    .pipe(sourcemaps.init({loadMaps: true}))

    .pipe(uglify())

    // write sourcemaps
    .pipe(sourcemaps.write('./'))

    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(bs.stream());
};

// Rerun the task when a file changes
export function watch() {
  bs.init({
    server: paths.ms.dest
  });
  watcher(paths.styles.src, gulp.series('mkcss'));
  watcher(paths.images.src, gulp.series('images'));
  watcher(paths.scripts.src, gulp.series('scripts'));
  watcher([
    paths.ms.src + paths.layouts.src,
    paths.ms.src +  paths.layouts.partials,
    paths.md.src
    ],
    gulp.series(refs, metal));
};


export default gulp.series(refs, preimg, gulp.parallel(metal, mkcss, images, scripts));