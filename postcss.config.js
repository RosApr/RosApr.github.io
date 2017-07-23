module.exports = {
	plugins: [
		require("autoprefixer")({
			browsers: ["Android >= 4.0", "IOS 8", "last 2 versions", "> 1%"]
		}),
		require("postcss-plugins-px2rem")({
			remUnit: 75//iphone6
		}),
		require("cssnano")({zindex: false})//fix cannot transform z-index correct bug
	]
};