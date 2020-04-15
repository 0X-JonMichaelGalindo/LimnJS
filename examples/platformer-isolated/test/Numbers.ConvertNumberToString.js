test.Outline( "seven*", n => n === 7, "Is it seven." );

test( "Numbers.ConvertNumberToString", {
    imports: {
        "pick": "pickFunction",
    },
    parameters: [ 
        "a:number",
        "useDecimals:boolean",
        "isSeven:seven*",
    ],
    returns: "undefined",
    factory: () => {
        return ( _, a, useDecimals, isSeven ) => {
            //console.log( "logged from co-loaded test, ", a, useDecimals );
            return undefined;
        }
    }
} )