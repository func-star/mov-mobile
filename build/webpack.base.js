var path = require('path');
var webpack = require('webpack');

module.exports = {
	cache: true,
	entry: {
		app: ['./src/app.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js', '.vue'],
		modules: [
			path.resolve(__dirname, '../node_modules'),
			path.resolve(__dirname, '../src'),
			path.resolve(__dirname, '../src/components'),
			path.resolve(__dirname, '../src/views'),
			path.resolve(__dirname, '../src/style'),
		],
		alias: {
			'mov': path.resolve(__dirname, '../'),
			'src': path.resolve(__dirname, '../src'),
			'vue': path.resolve('./node_modules/vue'),
			'autoprefixer': path.resolve('./node_modules/autoprefixer'),
		},
	},
	resolveLoader: {
		modules: ['node_modules'],
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
	],
	module: {
		rules: [],
	},
};
