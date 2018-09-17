var path = require('path');
var serverConf = {
	contentBase: path.resolve(__dirname, '../src'),
	progress: false,
	hot: true,
	inline: true,
	proxy: {},
	historyApiFallback: true,
	disableHostCheck: true,
	stats: {
		colors: true,
	},
};

module.exports = serverConf;

