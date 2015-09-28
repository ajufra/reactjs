function init() {

    var scr1 = document.createElement('script');
    scr1.setAttribute('src', "lib/react.js");
    document.getElementsByTagName('body')[0].appendChild(scr1);

	var scr2 = document.createElement('script');
    scr2.setAttribute('src', "lib/JSXTransformer.js");
    document.getElementsByTagName('body')[0].appendChild(scr2);

	var scr3 = document.createElement('script');
    scr3.setAttribute('src', "data.js");
    document.getElementsByTagName('body')[0].appendChild(scr3);

    var scr4 = document.createElement('script');
	scr4.setAttribute('src', "main.js");
	scr4.setAttribute('type', "text/jsx");	
    document.getElementsByTagName('body')[0].appendChild(scr4);
}


