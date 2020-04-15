platformer( "IO.getLoopingState", {
    imports: {
        "state": "IO.getGameState"
    },
    returns: "boolean",
    factory: () => {
        return imports => imports.state().flags.looping;
    }
})