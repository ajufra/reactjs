/*
var APPPATH = 'Android/data/com.phonegap.ReactJS/files';

if (typeof app !== 'undefined') {
    alert("utilities.js typeof app !== undefined");
    app.initialize();
}else{
    alert("utilities.js typeof app === undefined");
}

function toJSON(data) {
    try {
        if (data !== null && data !== '') {
            data = $.parseJSON(data);
        } else {
            console.debug('Parse JSON data is empty or null.');
            data = false;
        }
    } catch (exc) {
        console.debug(data + ': Parse JSON data error.');
        data = false;
    }
    return data;
};

function getDirectory(callbackSuccess, callbackFail) {
    window.requestFileSystem(
        LocalFileSystem.PERSISTENT, 0,
        function(fileSystem) {
            fileSystem.root.getDirectory(APPPATH, {
                    create: true
                },
                function(file) {
                    callbackSuccess(file);
                }, callbackFail);
        }, callbackFail);
}

function fileExists(filename, callbackSuccess, callbackFail) {
    getDirectory(function(file) {
        file.getFile(
            filename, {
                create: false
            },
            callbackSuccess,
            callbackFail);
    }, callbackFail);
}

function writeFile(filename, content, callbackSuccess, callbackFail) {
    getDirectory(function(file) {
        file.getFile(
            filename, {
                create: true
            },
            function(fileEntry) {
                fileEntry.createWriter(
                    function(writer) {
                        writer.write(content);
                        callbackSuccess();
                    },
                    callbackFail);
            },
            callbackFail);
    }, callbackFail);
}

*/

function onDeviceReady() {
    alert('onready');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    alert('gotFS');
    //fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, gotFileEntry, fail);
}