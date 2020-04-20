boxes( "Canvas.setup", {
    imports: {
        "getRef": "Canvas.getCanvasContext"
    },
    factory: () => {
        return () => {
            const { getRef } = imports;
            let canvasContext = getRef();
            canvasContext.cnv = document.body.appendChild( document.createElement( "canvas" ) );
            let w = canvasContext.cnv.width = canvasContext.w = 400,
                h = canvasContext.cnv.height = canvasContext.h = 400;
            canvasContext.ctx = canvasContext.cnv.getContext( "2d" );
            canvasContext.ctx.fillStyle = "rgb(220,220,220)";
            canvasContext.ctx.fillRect( 0,0,w,h );
        }
    }
})