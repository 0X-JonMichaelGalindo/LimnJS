boxes( "Canvas.drawBoxes", {
    imports: {
        "getCanvas": "Canvas.getCanvasContext",
        "getBoxes" : "Data.getDataObject"
    },
    factory: () => {
        return ( imports ) => {
            const { getCanvas, getBoxes } = imports,
                { ctx, w, h } = getCanvas(),
                { boxes, scale } = getBoxes();
            ctx.fillStyle = "rgb(220,220,220)";
            ctx.fillRect( 0,0, w,h );
            ctx.strokeStyle = "rgb(150,150,150)";
            for( let b of boxes ) {
                ctx.strokeRect( 
                    b.x * scale.x,
                    b.y * scale.y,
                    b.w * scale.w,
                    b.h * scale.h
                )
            }
        }
    }
}, "Draw the boxes from Canvas.boxData*.boxes onto the screen." )