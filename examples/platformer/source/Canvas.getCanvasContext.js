platformer.Outline( "NativeTypes.canvas*", "object", "The native HTML5 canvas element." );
platformer.Outline( "NativeTypes.canvas.context2d*", "object", "The 2d context of the native HTML5 canvas element." );

platformer.Outline( "Canvas.canvasContext*", {
    "cnv": "NativeTypes.canvas*",
    "ctx": "NativeTypes.canvas.context2d*",
    "w": "number",
    "h": "number"
}, "Data associated with the canvas used to draw boxes on-screen." );

platformer.Outline( "Canvas.canvasContextEmpty*", {
    "cnv": "null",
    "ctx": "null",
    "w": "number",
    "h": "number"
}, "The unpopulated canvas container." )

platformer( "Canvas.getCanvasContext", {
    returns: "Canvas.canvasContext*|Canvas.canvasContextEmpty*",
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