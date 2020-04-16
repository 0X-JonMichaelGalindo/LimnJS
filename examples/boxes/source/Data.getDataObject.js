boxes.Outline( "Data.box*",
    { "x":"number", "y":"number", "w":"number", "h":"number" },
    "A rectangle, but each entry is a number between 0 and 1, which is then scaled up to the size of the screen by multiplying by the contents of Data.boxData*.scale{x,y,w,h}"
);

boxes.Outline( "Data.boxData*", {
    "boxes": [ "Data.box*", "..." ],
    "scale": {
        "x": "number",
        "y": "number",
        "w": "number",
        "h": "number"
    }
} );

boxes( "Data.getDataObject", {
    returns: "Data.boxData*",
    factory: () => {
        let data = {
            boxes: [],
            scale: {
                x:0, y:0,
                w:0, h:0
            }
        }
        return ( () => data );
    }
} )