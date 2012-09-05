var http = require('http'),
    url = require('url'),
    static = require('node-static');

var fileServer = new static.Server('./public');

var server = http.createServer(function (request, response) {
  fileServer.serve(request, response);
});

server.listen(process.env.PORT || 3000);
