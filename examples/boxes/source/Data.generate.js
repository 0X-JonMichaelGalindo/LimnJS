boxes( "Data.generate", {
    imports: {
        "getRef": "Data.getDataObject",
        "getScreen": "Canvas.getCanvasContext"
    },
    parameters: [
        "boxCount:number"
    ],
    factory: () => {
        return ( imports, boxCount ) => {
            const { getRef, getScreen } = imports,
                ref = getRef(),
                screen = getScreen();
            ref.scale.x = screen.w * 0.9;
            ref.scale.y = screen.h * 0.9;
            ref.scale.w = screen.w * 0.1;
            ref.scale.h = screen.h * 0.1;
            for( let i=0; i<boxCount; i++ )
                ref.boxes.push( {
                    x: Math.random(),
                    y: Math.random(),
                    w: Math.random(),
                    h: Math.random()
                } );
        }
    }
}, "Generate a # of boxes and populate them in Data.getDataObject().boxes. Also define the scale over which the boxes will be drawn.")