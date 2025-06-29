module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react-refresh/only-export-components": "off",
		"react/prop-types": "off", // this line ensure prop validation is turned off

		"no-mixed-spaces-and-tabs": "off", // completely disables the rule
		// "no-unused-vars": "off", // Completely disables the rule
	},
};
