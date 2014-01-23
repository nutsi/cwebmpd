/**
 * Module dependencies.
 */

var express = require('express')
    , io = require('socket.io')
  , cons = require('consolidate')
  , http = require('http')
  , path = require('path')
  , swig = require('swig')
  , ws = require('ws')
  , client = require('./js/client.js')
  , parse = require('./js/parse.js')
  ;

var app = express();

// all environments
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.engine('html', cons.swig);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


client.on('ready', function() {
  var server = http.createServer(app)
    , wss = new ws.Server({server: server});

console.log(app.get('port'));
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });

  wss.on('connection', function(ws) {
    var command = ws.upgradeReq.url.replace('/', '')
      , commandPolling = (function() {
        client.command(command, function(err, data) {
          ws.send(JSON.stringify(data));
        }, parse.hash);
      })
      , id = setInterval(commandPolling, 500);

    ws.on('close', function() {
      clearInterval(id);
    });

  });
});

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/currentsong', function(req, res, next) {
    client.command('currentsong', function(err, song) {
        res.json(song);
    }, parse.hash);
});

app.get('/status', function(req, res, next) {
    client.command('status', function(err, song) {
        res.json(song);
    }, parse.hash);
});

app.get('/playlist', function(req, res, next) {
    client.command('playlistid', function(err, song) {
        res.json(song);
    }, parse.playlist);
});

app.post('/next', function( req, res, next) {
    client.next(function(err) {
        res.json(202, {ok: true});
    });
});

app.post('/prev', function( req, res, next) {
    client.prev(function(err) {
        res.json(202, {ok: true});
    });
});

app.post('/pause', function(req, res, next) {
    client.pause(req.body.pause, function(err) {
    });
});

app.post('/playidsong', function(req, res, next) {
    client.playid(req.body.id, function(err) {
        res.json(202, {ok: true});
    });
});

app.post('/addsongs', function(req, res, next) {
    client.addsongs(req.body.tags.trim(), req.body.search.trim(), function(err) {
        res.json(202, {ok: true});
    });
});


app.get('/collection', function(req, res, next) {
    client.collection(req, function(err, song) {
        res.json(song);
    });
});

