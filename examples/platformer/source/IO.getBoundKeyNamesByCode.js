platformer.Outline( "IO.Types.keyNamesByCode*", {
    "37": "string",
    "38": "string",
    "39": "string",
    "40": "string",
    "27": "string"
} );

platformer( "IO.getBoundKeyNamesByCode", {
    returns: "IO.Types.keyNamesByCode*",
    factory: () => {
        let keyNamesByCode = Object.freeze( {
            "37": "left-arrow",
            "38": "up-arrow",
            "39": "right-arrow",
            "40": "down-arrow",
            "27": "break"
        } );
        return () => keyNamesByCode;
    }
})