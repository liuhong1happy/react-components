var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 */

var taskConfig = {
	component: {
		name: 'main',
		dependencies: [
			'classnames',
			'react',
			'react-dom'
		],
		lib: 'lib',
		less: {
			entry: 'main.less',
			path: 'less'
		}
	},
	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'.gitignore'
		],
		scripts: [
			'app.js'
		],
		less: [
			'app.less'
		]
	}
};

initGulpTasks(gulp, taskConfig);