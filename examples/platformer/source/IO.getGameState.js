platformer.Outline( "IO.Types.keyStates*", {
    "left-arrow": "boolean",
    "up-arrow": "boolean",
    "right-arrow": "boolean",
    "down-arrow": "boolean"
} );

platformer.Outline( "IO.Types.gameState*", {
    "flags": {
        "looping": "boolean"
    },
    "keyStates": "IO.Types.keyStates*",
    "time": "number|null",
    "deltaTime": "number"
} )

platformer( "IO.getGameState", {
    returns: "IO.Types.gameState*",
    factory: () => {
        let gameState = {
            flags: {
                "looping": true
            },
            "keyStates": {
                "left-arrow": false,
                "up-arrow": false,
                "right-arrow": false,
                "down-arrow": false,
            },
            "time": null,
            "deltaTime": 1
        }
        return () => gameState;
    }
} )