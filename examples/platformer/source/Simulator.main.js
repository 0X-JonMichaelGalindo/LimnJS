platformer( "Simulator.main", {
    imports: {
        "getState": "IO.getGameState",
        "getConfig": "Simulator.getConfiguration",

        "jump": "Simulator.jump",
        "strafe": "Simulator.strafe",
        "fall": "Simulator.fall",
        "frict": "Simulator.frict",
        "move": "Simulator.move",
        "keepInScreen": "Simulator.keepCharacterOnScreen",
    },
    factory: () => {
        return imports => {
            const { getState, getConfig, 
                    jump, strafe, fall, frict, move,
                    keepInScreen } = imports,
                state = getState(),
                simulatorTimestep = getConfig().simulatorTimestep;

            while( state.deltaTime > simulatorTimestep ) {
                jump( simulatorTimestep );
                strafe( simulatorTimestep );
                fall( simulatorTimestep );
                move( simulatorTimestep );
                frict( simulatorTimestep );
                keepInScreen();
                state.deltaTime -= simulatorTimestep;
            }
        }
    }
} )