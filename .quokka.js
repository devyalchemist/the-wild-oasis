const path = require("path");

module.exports = {
	// Tell Quokka what environment you're in
	env: {
		type: "node", // or 'browser' if you're doing DOM work
	},

	// Resolve aliases like `src/` to the actual folder
	webpack: {
		resolve: {
			alias: {
				src: path.resolve(__dirname, "./src"),
			},
		},
	},
};
