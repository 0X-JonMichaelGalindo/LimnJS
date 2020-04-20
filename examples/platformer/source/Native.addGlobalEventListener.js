platformer( "Native.addGlobalEventListener", {
    parameters: [
        "name:string",
        "handle:function"
    ],
    factory: () => {
        return ( name, handle ) => window.addEventListener( name, handle );
    }
}, "Documenting wrapper for addEventListener." );