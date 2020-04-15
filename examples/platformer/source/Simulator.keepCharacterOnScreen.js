platformer( "Simulator.keepCharacterOnScreen", {
    imports: {
        "getChar": "World.getCharacterData",
        "getScreen": "Canvas.getCanvasContext"
    },
    factory: () => {
        return imports => {
            const { getChar, getScreen } = imports,
                char = getChar(),
                screen = getScreen();
            if( char.x < 0 ) char.x = 0;
            if( ( char.x + char.w ) > screen.w )
                char.x = screen.w - char.w;
        }
    }
} )