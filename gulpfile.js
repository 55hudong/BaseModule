/**
 * create by 冷色的咖啡
 */

const gulp         = require("gulp"),
      uglify       = require("gulp-uglify"),
      browserSync  = require("browser-sync").create(),
      childProcess = require("child_process");

const {spawn, spawSync} = childProcess;

const distUrl = "dist/",
      srcUrl  = "src/",
      buildUrl = "build/";


/**
 * 启动webpack或者webpack-dev-server
 */
const webpackFn = function (progressName) {

    let cmd = "",
        params = [];

    if(progressName === "webpack"){
        cmd = "node";
        params = ["./node_modules/webpack/bin/webpack", "-w", "true"]
    }else if(progressName === "webpack-dev-server"){
        cmd = "node";
        params = ["./node_modules/webpack-dev-server/bin/webpack-dev-server"]
    }else{
        throw new Error(`未知参数值: ${progressName}, 暂只支持"webpack" 或者 "webpack-dev-server"`);
    }

    const packer = {
        self: null,

        init: function(){
            this.start();
        },

        start: function () {
            console.log("启动webpack进程...");
            this.self = spawn(cmd, params);
            this.self.stdout.on("data", function (data) {
                console.log(data.toString());
            })
        },
        stop: function () {
            console.log("终止webpack进程..");
            this.self.kill();
        },
        restart: function () {
            this.stop();
            this.start();
        }
    };


    packer.init();

    gulp.watch(`${srcUrl}/*.js`, function (event) {
        switch (event.type){
            case "deleted":
            case "added":
                console.log("监听到文件数量发生了改变，正在重启webpack.");
                packer.restart();
        }
    });

    gulp.watch("webpack.config*.js", function () {
        console.log("监听到webpack配置发生了改变，正在重启webpack...");
        packer.restart();
    });

};

gulp.task("webpack", webpackFn.bind(this, "webpack"));

gulp.task("server", webpackFn.bind(this, "webpack-dev-server"));

gulp.task("build", function () {
    gulp.src(buildUrl + "**/*.*")
        .pipe(uglify({
            compressor: {drop_debugger: true}
        }))
        .pipe(gulp.dest(distUrl))
});

gulp.task("auto", ["webpack"], function () {

    browserSync.init({
        server: ".",
        port: 9010
    });

    gulp.watch("example/**/*.html", browserSync.reload);
    gulp.watch("example/**/*.css", browserSync.reload);

    gulp.watch(buildUrl + "**/*.*", browserSync.reload);

});

/**
 * webpack因为已经开启了自动重启，所以只需要通过子进程再开启gulp auto任务
 */
gulp.task("default",  function () {

    let _gulp;

    let startGulp = function () {

        // 已经启动过gulp，需要自动结束
        if(_gulp){
            _gulp.kill();
        }

        _gulp = spawn("node", ["./node_modules/.bin/gulp", "auto"]);
        _gulp.stdout.on("data", function (data) {
            process.stdout.write(data.toString());
        });
    };

    gulp.watch("gulpfile*.js", startGulp);

    startGulp();
});