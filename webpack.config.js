const webpack           = require("webpack"),
		  path              = require("path"),
			ExtractTextPlugin = require("extract-text-webpack-plugin"),
			isDebug           = process.env.NODE_ENV === "development",
			lessConfig        = isDebug
				? "style-loader!css-loader!postcss-loader!less-loader"
				: ExtractTextPlugin.extract({
				fallback: "style-loader",
				loader: "css-loader!postcss-loader!less-loader"
			});
module.exports = {
	entry: {
		app: path.resolve(__dirname, "./src/js/index.js")
	},
	output: {
		path: path.resolve(__dirname, "./dist/js"),
		publicPath: "http://localhost:8080/dist/js",
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					}
				]
			},
			{
				test: /\.less$/,
				loader: lessConfig
					// {
					// 	loader: "style-loader"
					// },
					// {
					// 	loader: "css-loader"
					// },
					// {
					// 	loader: "postcss-loader"
					// },
					// {
					// 	loader: "less-loader"
					// }
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
						}
					}
				]
			},
			{
				test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
				use: [
					{
						loader: "url-loader"
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			'swiper$': 'swiper/dist/js/swiper.jquery.js'
		}
	},
	performance: {
		hints: false
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		inline: true,
		port: 8080,
		contentBase: path.resolve(__dirname, "./")
		// compress: false,
	},
	devtool: "#eval-source-map",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("../css/[name].css")
	]
};
if(!isDebug) {
	module.exports.devtool = "#source-map";
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			},
			mangle: true,
			beautify: false,
			comments: false
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"'
			}
		})
	])
}else {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"development"'
			}
		})
	])
}
