platformer( "IO.getLoopingState", {
    imports: {
        "state": "IO.getGameState"
    },
    returns: "boolean",
    factory: () => {
        return () => imports.state().flags.looping;
    }
})