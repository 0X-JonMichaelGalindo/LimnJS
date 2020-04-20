platformer( "Simulator.fall", {
	imports:{
		"getConfig": "Simulator.getConfiguration",
		"getChar": "World.getCharacterData",
		"hit": "World.checkCharacterPlatformCollision"
	},
	parameters: [
		"t:number"
	],
	factory: () => {
		return t => {
			const { getConfig, getChar, hit } = imports,
				config = getConfig(),
				char = getChar(),
				hitState = hit();
			if( hitState.depth > 0 ) {
				char.y = hitState.platformY - char.h;
				if( char.v.y > 0 ) char.v.y = 0;
			}
			else if( hitState.depth !== 0 ) {
				char.v.y += t * config.gravityAcceleration
			}
		}
	}
})