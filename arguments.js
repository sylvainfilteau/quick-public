var fs = require('fs');

exports.parse = function(default_port, default_path) {
	var port = default_port || 3000;
	var path = default_path || process.cwd();

	var arguments = process.argv;
	arguments.shift(); // Poping the executable
	arguments.shift(); // Poping the current script

	if (arguments.length > 0) {
		var arg = arguments.shift();
		var test_port = parseInt(arg);
		if (test_port == arg && 0 <= test_port && test_port <= 65535) {
			port = test_port;
		} else {
			arguments.unshift(arg);
		}
	}

	if (arguments.length > 0) {
		var test_path = arguments.shift();
		try {
			var stat = fs.statSync(test_path);
			if (!stat.isDirectory()) {
				throw new Error("The path is not a directory");
			}
			path = test_path;
		} catch (e) {
			console.log("Unable to parse the path or port... (reason : '" + e + "'");
		}
	}

	return {
		port: port,
		path: path
	};
}
