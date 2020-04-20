Hello( "hello-world", {
    parameters: [ "name:string" ],
    factory: function() {
        function helloWorldMethod( name ) {
            document.body.innerText = "Hello, World! Hello, " + name + "!";
        }

        return helloWorldMethod;
    }
}, "\"hello-world\" prints our app's greeting to the screen, using the name passed as a parameter.")