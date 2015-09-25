
var APPPATH = 'Android/data/com.phonegap.ReactJS/files';
/*
if (typeof app !== 'undefined') {
    alert("utilities.js typeof app !== undefined");
    app.initialize();
}else{
    alert("utilities.js typeof app === undefined");
}
*/
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
         file.getFile( filename, { create: false }, function(fileEntry) {
            alert('fileExists.callbackSuccess');
            if (callbackSuccess) {

                var reader = new FileReader();

                reader.onloadend = function(e) {
                    callbackSuccess(this.result);
                }

                reader.readAsText(fileEntry);
            }
         }, callbackFail);
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


/*
function gotFile(fileEntry) {

    alert("on gotFile");

    fileEntry.file(function(file) {
        alert("on gotFile.fileEntry.file");
        var reader = new FileReader();
        alert("after reader");
        reader.onloadend = function(e) {
            alert(this.result);
        }
        alert("before readAsText");
        reader.readAsText(file);
    });

}
*/

function win(file) {
    alert('on win');
    var reader = new FileReader();
    alert('after reader');
    reader.onloadend = function(evt) {
        alert(evt.target.result);
    };
    alert('before readAsText');
    reader.readAsText(file);
};

//------------------------------------

function gotFS(fileSystem) {
        fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        //readDataUrl(file);
        readAsText(file);
    }

    function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            alert("Read as text - " + evt.target.result);
        };
        reader.readAsText(file);
    }

    function fail(evt) {
        console.log(evt.target.error.code);
    }
//------------------------------------


document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {

    //Se verifica si el archivo existe
    /*
    fileExists('myFile.txt',  function(content) {
        alert('File Exist - ' + content);
    }, function() {
        alert('File Doesn\'t exist');
    });
    */

    //Se crea el archivo
    writeFile('myFile.txt', 'Lorem ipsum dolor 2...', function() {
        alert('File created succesfully!!!');
        //win(APPPATH+'/myFile.txt');

         window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);


    }, function() {
        alert('Error creating file!!!');
    });


    
}