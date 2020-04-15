platformer( "Main.start", {
    imports: {
        "setupCanvas": "Canvas.setup",
        "setupWorld": "World.setup",

        "bindKeys": "IO.bindKeyboardEvents",

        "startAnimationFrame": "Native.requestAnimationFrame",
        "loop": "Main.loop",
    },
    factory: () => {
        return ( imports ) => {
            const { 
                setupCanvas, 
                setupWorld, 

                bindKeys,

                startAnimationFrame, 
                loop,
            } = imports;

            setupCanvas();
            setupWorld();
            bindKeys();
            startAnimationFrame( loop );
        }
    }
}, "The starting point of the platformer demo. Here, we call the setup for the canvas and the world, call the binder event setup for the keyboard arrows, and launch the main game loop." )