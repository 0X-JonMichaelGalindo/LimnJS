platformer( "Simulator.strafe", {
	imports:{
		"getConfig": "Simulator.getConfiguration",
		"getKeyStates": "IO.getKeyStates",
		"getChar": "World.getCharacterData",
	},
	parameters: [
		"t:number"
	],
	factory: () => {
		return ( imports, t ) => {
			const { getConfig, getKeyStates, getChar } = imports,
				config = getConfig(),
				keys = getKeyStates(),
				char = getChar();
			if( keys[ "left-arrow" ] ) 
				char.v.x -= t * config.strafeAcceleration;
			if( keys[ "right-arrow" ] )
				char.v.x += t * config.strafeAcceleration;
		}
	}
})