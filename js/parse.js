exports.hash = function hash(str) {                              
    var data = {}
    , parsed;

    if(str) {
        str.split('\n').forEach(function(line) {
            parsed = line.split(':');
            if(parsed) {
                data[parsed[0]] = parsed[1];
            }
        });
    }
    return data;
};  

function parseFileName(str) {
    return str.split('/').reverse()[0];
};

exports.playlist = function playlist(str) {
    var parsed
        , data = [];
    var hasArtist = false,
        hasAlbum = false,
        hasGenre = false,
        hasTitle = false;
    var first = true;
    if(str) {
        str.split('\n').forEach(function(line) {
            parsed = line.split(':');
            // Do not process `directory` lines
            if(parsed && parsed[0] !== 'directory') {
                if(parsed[0] === 'file') {
                    if (first == false) {
                    if (hasTitle == false) {
                        data[data.length -1]['Title'] = parseFileName(data[data.length-1]['file']);
                    }
                    if (hasGenre == false) data[data.length -1]['Genre'] = 
                                               'Unknow'; 
                    if (hasArtist== false) data[data.length -1]['Artist'] = 
                                               'Unknow Artist'; 
                    if (hasAlbum== false) data[data.length -1]['Album'] = 
                                               'Unknow Album'; 
                    }
                    hasArtist = false, hasGenre = false, hasAlbum = false, hasTitle = false;
                    first = false;
                    data.push({});
                    data[data.length - 1]['Time'] = '00:00';
                }
                if (parsed[0] == 'Title') hasTitle = true;
                if (parsed[0] == 'Genre') hasGenre= true;
                if (parsed[0] == 'Album') hasAlbum= true;
                if (parsed[0] == 'Artist') hasArtist= true;
                console.log(parsed);
                if (parsed[0] != 'Last-Modified')
                data[data.length - 1][parsed[0]] = parsed[1];
            }
        });
    }
    if (first == false) {
        if (hasTitle == false) data[data.length -1]['Title'] = 
            data[data.length-1]['Name'];
        if (hasGenre == false) data[data.length -1]['Genre'] = 
            'Unknow'; 
        if (hasArtist== false) data[data.length -1]['Artist'] = 
            'Unknow Artist'; 
        if (hasAlbum== false) data[data.length -1]['Album'] = 
            'Unknow Album'; 
    }
    return data;
};
