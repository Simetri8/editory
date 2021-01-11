module.exports = function editory(string) {
	if (typeof string !== "string")
		throw new TypeError("editory wants a string!");
	return string.replace(/\s\s/g, " ");
};
