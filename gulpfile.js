/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

var 
    gulp = require("gulp"),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin");

var 
    source = "public/",
    dest = "build/",
    
    images = {
        in: source + "images/*.*",
        out: dest + "images/"
    };

gulp.task("images", function() {
    return gulp.src(images.in)
        .pipe(newer(images.out))
        .pipe(imagemin())
        .pipe(gulp.dest(images.out));
})

gulp.task("default", function() {
    
});