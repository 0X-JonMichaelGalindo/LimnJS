platformer( "Canvas.drawWorld", {
    imports: {
        "getWorld": "World.getWorldData",
        "getCharacter": "World.getCharacterData",
        "getCanvas": "Canvas.getCanvasContext",
    },
    factory: () => {
        return () => {
            const { getWorld, getCharacter, getCanvas } = imports,
                { cnv, ctx, w, h } = getCanvas(),
                { platforms } = getWorld();
            ctx.fillStyle = "rgb(240,240,240)";
            ctx.fillRect( 0,0,w,h );
            ctx.fillStyle = "rgb(128,128,128)";
            for( let p of platforms ) {
                ctx.fillRect( p.x, p.y, p.w, p.h );
            }
            ctx.fillStyle = "rgb(50,128,220)";
            let char = getCharacter();
            ctx.fillRect( char.x, char.y, char.w, char.h );
        }
    }
})