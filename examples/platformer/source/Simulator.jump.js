platformer( "Simulator.jump", {
	imports:{
		"getConfig": "Simulator.getConfiguration",
		"getKeyStates": "IO.getKeyStates",
		"getChar": "World.getCharacterData",
		"checkHit": "World.checkCharacterPlatformCollision"
	},
	parameters: [
		"t:number"
    ],
	factory: () => {
		return t => {
			const { getConfig, getKeyStates, getChar, checkHit } = imports,
				config = getConfig(),
				keys = getKeyStates(),
				char = getChar(),
				hit = checkHit();
			if( hit.depth === 0 && keys[ "up-arrow" ] ) 
				char.v.y -= t * config.jumpAcceleration;
		}
	}
})