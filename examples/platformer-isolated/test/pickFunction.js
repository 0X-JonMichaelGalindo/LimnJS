test.Outline( "someFunction()*", {
    //parameters: [ "a:number", "b:number" ],
    //returns: "boolean"
})

test( "pickFunction", {
    parameters: [ "info:any" ],
    returns: "someFunction()*",
    factory: function() { 
        return function() {
            console.log( this ? this.prop : "No this." );
            return () => {};
        } 
    }
} )