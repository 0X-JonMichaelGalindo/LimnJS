platformer.Outline( "NativeTypes.canvas*", "object", "The native HTML5 canvas element." );
platformer.Outline( "NativeTypes.canvas.context2d*", "object", "The 2d context of the native HTML5 canvas element." );

platformer.Outline( "Canvas.canvasContext*", {
    "cnv": "NativeTypes.canvas*|null",
    "ctx": "NativeTypes.canvas.context2d*|null",
    "w": "number",
    "h": "number"
}, "Data associated with the canvas used to draw boxes on-screen." )

platformer( "Canvas.getCanvasContext", {
    returns: "Canvas.canvasContext*",
    factory: () => {
        let canvasContext = {
            cnv: null,
            ctx: null,
            w: -1,
            h: -1
        }
        return ( () => canvasContext );
    }
} )