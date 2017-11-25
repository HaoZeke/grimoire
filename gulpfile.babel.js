import gulp from 'gulp';
import ms from 'gulp-metalsmith';
import mspmd from 'metalsmith-pandoc';
import msc from 'metalsmith-collections';

const paths = {
	ms: {
		src: 'src/'
	},
	md: {
		src: 'src/content/',
		dest: 'dist/'
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
   	  // Pandoc Markdown
        mspmd({
        	from: 'markdown+smart',
		    to:   'html5',
		    args: ['--katex'],
			opts: {},
			pattern: '**/*.md', // multimatch
			ext: '.html' // extension for output file
			}),
      ],
      // Initial Metalsmith metadata, defaults to {} 
      metadata: {
        site_title: 'Sample static site'
      },
      // List of JSON files that contain page definitions 
      // true means "all JSON files", see the section below 
      //json: ['src/pages.json']
    }))
  	.pipe(gulp.dest(paths.md.dest)
    )
cb();
};


export default gulp.series(metal);