var queryString = require('querystring'),
	Path = require('path'),
	fs = require('fs'),
	parseUrl = require('url').parse;

module.exports = function (root) {
	return function fileIndex(req, res, next) {
		if (req.method != 'GET' && req.method != 'HEAD') return next();

		var head = req.method == 'HEAD',
			url = parseUrl(req.url),
			filename;

		if (~url.pathname.indexOf('..')) {
			return forbidden(res);
		}
		
		var url_pathname = queryString.unescape(url.pathname);
		filename = Path.join(root, url_pathname);

		fs.stat(filename, function(err, stat) {
			if (err) {
				return err.errno === process.ENOENT ? next() : next(err);
			}

			if (!stat.isDirectory()) {
				return next();
			}

			var dirname = filename;

			fs.readdir(filename, function(err, files) {
				files = files.filter(function(file) {
					// Filter out dot files
					var first = file.substr(0, 1);
					return !(first == "" || first == ".");
				}).map(function(file) {
					return {
						filename: Path.join(url_pathname, file),
						basename: file
					};
				});

				res.render('index.jade', {
					locals: {
						files: files,
						dirname: url_pathname
					}
				});
			});
		});
	};
};

/**
 * Respond with 403 "Forbidden".
 *
 * @param {ServerResponse} res
 * @api private
 */

function forbidden(res) {
	var body = 'Forbidden';
	res.writeHead(403, {
		'Content-Type': 'text/plain',
		'Content-Length': body.length
	});
	res.end(body);
}

