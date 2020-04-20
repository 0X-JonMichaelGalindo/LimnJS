platformer( "World.setup", {
    imports: {
        "getScreen": "Canvas.getCanvasContext",
        "getWorld": "World.getWorldData",
        "getCharacter": "World.getCharacterData",
    },
    factory: () => {
        return () => {
            const { getScreen, getWorld, getCharacter } = imports;
            let screen = getScreen(),
                w = screen.w,
                h = screen.h
                worldObj = getWorld();
            worldObj.platforms = [
                { x:w*0.25, y:h*0.25, w:w*0.25, h:h*0.05 },
                { x:w*0.5,y:h*0.5, w:w*0.25, h:h*0.05 },
                { x:w*0.75,y:h*0.75, w:w*0.1875, h:h*0.05 },
                { x:w*0.875, y:h*0.875, w:w*0.125, h:h*0.05 }
            ];
            let character = getCharacter();
            character.x = w * 0.5;
            character.y = h * 0.9;
            character.h = h * 0.1;
            character.w = h * 0.05;
        }
    }
})