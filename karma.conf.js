// Karma configuration
// Generated on Sat Dec 16 2017 15:47:04 GMT-0500 (EST)


module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha", "chai", "sinon"],

    files: ['node_modules/babel-polyfill/dist/polyfill.js', "tests/*.spec.js"],
    exclude: [],
    preprocessors: {
      'index.js': ['webpack'],
      'tests/*.spec.js': ['webpack']
    },
    // webpack configuration
    webpack: require("./webpack.config.js"),
    webpackMiddleware: {
      // stats: "errors-only"
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    browsers: ['PhantomJS'],
    // customLaunchers: {
    //     ChromeWithoutSecurity: {
    //         base: 'Chrome',
    //         flags: ['--disable-web-security']
    //     }
    // },

    // plugins: [
    //   'karma-webpack',
    //   'karma-mocha',
    //   'karma-chai',
    //   'karma-sinon',
    //   'karma-chrome-launcher',
    //   'karma-phantomjs-launcher',
    //   'karma-babel-preprocessor'
    // ],
    //

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
