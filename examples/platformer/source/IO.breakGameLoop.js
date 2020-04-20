platformer( "IO.breakGameLoop", {
    imports: {
        "getGameState": "IO.getGameState"
    },
    factory: () => {
        return () => { 
            imports.getGameState().flags.looping = false;
            console.log( "Broke game loop!" );
        }
    }
})