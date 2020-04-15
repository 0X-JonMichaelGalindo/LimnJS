platformer.Outline( "World.Types.hitTest*", {
	"depth": "number",
	"platformY": "number"
} );

platformer( "World.checkCharacterPlatformCollision", {
	imports: {
		"getScreen": "Canvas.getCanvasContext",
		"getConfig": "Simulator.getConfiguration",
		"getWorld": "World.getWorldData",
		"getChar": "World.getCharacterData"
	},
	returns: "World.Types.hitTest*",
	factory: () => {
		return imports => {
			const { getScreen, getConfig, getWorld, getChar } = imports,
				screenHeight = getScreen().h,
				config = getConfig(),
				fallSpeed = config.limits.velocity.y,
				fallTime = config.simulatorTimestep,
				fallDelta = fallSpeed * fallTime,
				platforms = getWorld().platforms,
				char = getChar(),
				charFeet = char.y + char.h;
			let hit = {
				depth: charFeet - screenHeight,
				platformY:screenHeight
			}
			for( let p of platforms ) {
				if( charFeet < ( p.y + fallDelta*1.1 ) ) {
					if( ( char.x + char.w ) > p.x && 
						char.x < ( p.x + p.w ) ) {
						hit.depth = charFeet - p.y;
						hit.platformY = p.y;
						break;
					}
				}
			}
			return hit;
		}
	}
})