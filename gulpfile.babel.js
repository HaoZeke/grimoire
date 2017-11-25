import gulp from 'gulp';
import ms from 'gulp-metalsmith';
import watcher from 'gulp-watch';
import mspmd from 'metalsmith-pandoc';
import msc from 'metalsmith-auto-collections';
import mslay from 'metalsmith-layouts';
import mshelp from 'metalsmith-register-helpers';
import msperma from 'metalsmith-permalinks';
import drafts from 'metalsmith-drafts';
import metallic from 'metalsmith-metallic';
import bs from 'browser-sync';

const paths = {
	ms: {
		src: 'src/',
		dest: 'dist/'
	},
	md: {
		src: 'src/content/',
		dest: 'dist/'
	},
	layouts: {
		src: 'layouts',
		partials: 'partials',
		helpers: 'helpers'
	}
};

export function metal(cb) {
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

        // Drafts
        drafts(),

        // Synatax Highlighting
        metallic(),

   	  	// Pandoc Markdown
        mspmd({
        	from: 'markdown+smart',
		    to:   'html5',
		    args: ['--katex'],
			opts: {},
			pattern: '**/*.md', // multimatch
			ext: '.html' // extension for output file
			}),

	    // Collections
	    msc({
	    	pattern: ['**/*.html', '!*.html']
	    }),

	    msperma({
	    	relative: false,
	    	pattern: ':title'
	    }),

        // Helper registration
        mshelp({
        	directory: paths.layouts.helpers
        }),

        // Template engine
        mslay({
        	engine: 'handlebars',
        	directory: paths.layouts.src,
        	partials: paths.layouts.partials,
        	default: 'default.hbs'
        }),
        function(files, ms, done) {
        	console.log('Files: ');
        	console.log(files);
        	console.log();
        	console.log('Metalsmith ');
        	console.log(ms);
        	done();
        }
      ],
      // Initial Metalsmith metadata, defaults to {} 
      metadata: {
        title: 'Sample static site'
      },
      // List of JSON files that contain page definitions 
      // true means "all JSON files", see the section below 
      //json: ['src/pages.json']
    }))
  	.pipe(gulp.dest(paths.md.dest))
  	.pipe(bs.stream());
cb();
};

// Rerun the task when a file changes
export function watch() {
  bs.init({
    server: paths.ms.dest
  });
  // watcher(paths.styles.src, gulp.series('mkcss'));
  // watcher(paths.images.src, gulp.series('images'));
  // watcher(paths.scripts.src, gulp.series('scripts'));
  watcher([
    paths.ms.src + paths.layouts.src,
    paths.ms.src +  paths.layouts.partials,
    paths.ms.src +  paths.layouts.helpers,
    paths.md.src
    ],
    gulp.series('metal'));
};


export default gulp.series(metal);