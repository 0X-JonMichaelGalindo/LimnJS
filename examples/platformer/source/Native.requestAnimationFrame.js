platformer( "Native.requestAnimationFrame", {
    parameters: [ "f:function" ],
    returns: "number", //I think ID is a number?
    factory: () => {
        return ( frameFunc ) => window.requestAnimationFrame( frameFunc );
    }
}, "A documenting wrapper for the requestAnimationFrame function, so we can see where it's used." )