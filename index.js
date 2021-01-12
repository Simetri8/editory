import Component from './src'

module.exports = function editory(s) {

	return <Component />

	if (typeof s !== "string")
		throw new TypeError("editory wants a string!");
	return s.replace(/\s\s/g, "");
};
