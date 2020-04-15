platformer.Outline( "Simulator.Types.configuration*", {
    "strafeAcceleration": "number",
    "jumpAcceleration": "number",
    "simulatorTimestep": "number",
    "coefficientOfFriction": "number",
    "gravityAcceleration": "number",
    "limits": {
        "velocity": {
            "x": "number",
            "y": "number"
        }
    }
})

platformer( "Simulator.getConfiguration", {
    returns: "Simulator.Types.configuration*",
    factory: () => {
        let configuration = {
            "strafeAcceleration": 0.02,
            "jumpAcceleration": 0.25,
            "simulatorTimestep": 5,
            "coefficientOfFriction": 0.9,
            "gravityAcceleration": 0.003,
            "limits": {
                "velocity": {
                    "x": 0.5,
                    "y": 0.75
                }
            }
        }
        return () => configuration;
    }
})