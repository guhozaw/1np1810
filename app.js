var port = process.env.VCAP_APP_PORT || 80;
var host = process.env.VCAP_APP_HOST || 'localhost';
var newsSrc = 'cnn';
var options = {
	host : 'www.nasa.gov',
	path : '/sites/default/files/thumbnails/image/viirs_9apr2015.jpg'
};
// var options = {
// host : 'newsapi.org',
// path : '/v1/articles?source=cnn&apiKey=0ecb50865d59472f92fd558bdfa4fd2d'
// };
var http = require('http');
var https = require('https');
function handleRequest(request, response) {
	response.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	response.write('Getting content\n');
	var res = https.get(options, function(res) {
		var pageData = "";
		res.on('data', function(chunk) {
			response.write(' .');
			pageData += chunk;
		});
		res.on('end', function() {
			response.end('\nContent loaded!');
		});
	});
}
var server = http.createServer(handleRequest);
server.listen(port, host, function() {
	console.log("Server started at", host, port);
});