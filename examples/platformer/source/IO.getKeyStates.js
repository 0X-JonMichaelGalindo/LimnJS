platformer( "IO.getKeyStates", {
    imports: {
        "getGameState": "IO.getGameState"
    },
    returns: "IO.Types.keyStates*",
    factory: () => {
        return imports => imports.getGameState().keyStates;
    }
} )