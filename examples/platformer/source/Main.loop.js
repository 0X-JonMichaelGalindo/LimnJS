platformer( "Main.loop", {
	imports: {
		"updateTime": "IO.updateTime",
		"simulate": "Simulator.main",
		"draw": "Canvas.drawWorld",
		"startAnimationFrame": "Native.requestAnimationFrame",
		"loop": "Main.loop",
		"stillLooping": "IO.getLoopingState"
	},
	parameters: [
		"t:number"
	],
	factory: () => {
		return t => {
			const {
				updateTime,
				simulate,
				draw,
				startAnimationFrame, 
				loop,
				stillLooping,
			} = imports;

			updateTime( t );
			simulate();
			draw();

			if( stillLooping() === true )
				startAnimationFrame( loop );
		}
	}
})