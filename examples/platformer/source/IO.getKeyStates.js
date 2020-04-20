platformer( "IO.getKeyStates", {
    imports: {
        "getGameState": "IO.getGameState"
    },
    returns: "IO.Types.keyStates*",
    factory: () => {
        return () => imports.getGameState().keyStates;
    }
} )