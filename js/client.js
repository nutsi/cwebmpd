var mpd = require('mpd')
    , parse = require('./parse.js');
    ;

var client = module.exports = new mpd.connect({
    port: 6600,
    host: 'localhost',
});


client.command = function status(str, fn, pfn) {
    client.sendCommand(str, function(err, str) {
        fn(err, pfn(str));
    });
};

client.next = function next(fn) {
    client.sendCommand('next', fn);
};

client.prev= function next(fn) {
    client.sendCommand('previous', fn);
};

client.pause = function pause(p, fn) {
    client.sendCommand(client.cmd('pause', [p]), fn);
};

client.playid = function playid(p, fn) {
    client.sendCommand(client.cmd('playid', [p]), fn);
};

client.collection = function collection(req, fn) {
    var art = 'Artist';
    var alb = 'album';
    var t = 'Evoken';
    client.command(client.cmd('listallinfo', ['']), fn, parse.playlist);
};

client.addsongs = function addsongs(tags, search, fn) {
    client.sendCommand(client.cmd('searchadd', [tags, search]), fn);
};
