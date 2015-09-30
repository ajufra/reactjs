
var APPPATH = 'Android/data/com.phonegap.ReactJS/files';

var sourceJSON = ''; 

var deviceEmployees = [];
//var deviceEmployees = [{    name:'Andrés Franco 4',     id: '001'},{    name:'Andres Giraldo',      id: '002'},];

//alert("utilities.js");
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

/*
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
*/

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


//-----------------------------------------------------------------------------------------------
//Lectura de un archivo
function readFile(fileSystem) {
        fileSystem.root.getFile(APPPATH+'/myFile.txt', null, gotFileEntry, fail);
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
        sourceJSON = evt.target.result;
        deviceEmployees = sourceJSON;
        //alert('Lectura desde el dispostivo = ' + deviceEmployees);
        
    };
    reader.readAsText(file);
}

function fail(evt) {
    console.log(evt.target.error.code);
}
//----------------------------------------------------------------------------------------------------

//Inicio


//Función de escritura y lectura de archivos
function onDeviceReady() {

    //alert("Dispositivo listo!!!");

    //Se crea el archivo
    writeFile('myFile.txt', emp, function() {
        console.log('File created succesfully!!!');
    }, function() {
        alert('Error creating file!!!');
    });

    //Se verifica si el archivo existe
    fileExists('myFile.txt',  function(content) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readFile, fail);
    }, function() {
        alert('Error reading files');
    });

    //React.renderComponent(<InstantBox data={employees}/>,document.body);

    // var App =  require('./main');

    // function startApp(){
    //     var app = new App({});
    //     React.renderComponent(app, document.body);  
    // }
}

window.onload = function(){
    var url = document.URL;
    var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
    if( isSmart ){
        //alert("onload.if");
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    else{
        //alert("onload.else");
    }
}

