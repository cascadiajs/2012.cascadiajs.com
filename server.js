var http = require('http'),
    url = require('url'),
    static = require('node-static'),
    sym = require('./public/glyphr');

var fileServer = new static.Server('./public');

var server = http.createServer(function (request, response) {
  var u = url.parse(request.url, true);
  if (u.pathname === '/transcode' && u.query.str) {
    response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
    var str = u.query.str;
    var result = {input: str, output: sym.transcode(str) };
    if (u.query.callback) {
      response.end(u.query.callback+'('+JSON.stringify(result)+');');
    }
    else {
      response.end(JSON.stringify(result));
    }

  }
  else if (u.pathname === '/sms') {
    response.writeHead(200, {"Content-Type": "text/xml;charset=utf-8"});
    var str = url.parse(request.url, true).query.Body;
    var result = sym.transcode(str);
    response.end('<Response><Sms>'+result+'</Sms></Response>');    
  }
  else {
    fileServer.serve(request, response);
  }
});

server.listen(process.env.PORT || 3000);
