platformer( "IO.updateTime", {
    imports: {
        "getState": "IO.getGameState",
    },
    parameters: [ "t:number" ],
    factory: () => {
        return t => {
            const { getState } = imports,
                state = getState();
            if( state.time === null )
                state.time = t;
            let dt = Math.max( 1, t - state.time );
            state.deltaTime = dt;
            state.time = t;
        }
    }
})