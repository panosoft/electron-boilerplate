const minimatch = require('minimatch');
const pack = require('electron-packager');
const pkg = require('../package');
const R = require('ramda');

/**
 * (patterns:array:string, path:string) => match:boolean
 */
const match = R.curry((patterns, path) => R.any(
	pattern => minimatch(R.tail(path), pattern),
	R.map(R.replace(/\/$/, ''), patterns)
));

const options = {
	dir: '.',
	platform: ['darwin', 'win32'],
	arch: 'all',
	out: 'dist/applications',
	app_version: pkg.version,
	asar: false,
	overwrite: true,
	prune: true,
	ignore: match([
		'.git',
		'dist',
		'node_modules/.bin',
		'node_modules/**/electron-prebuilt',
		'node_modules/**/electron-packager',
		'resources',
		'tasks',
		'test'
	]),
	'osx-sign': {identity: 'Alexandre Gigliotti'}
};
pack(options, (error, paths) => {
	if (error) console.error(error);
	else console.log(paths);
});

// TODO import signing certificate file via base64 env variable
