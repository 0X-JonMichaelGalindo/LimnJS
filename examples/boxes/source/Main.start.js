boxes( "Main.start", {
	imports: {
		"setupCanvas": "Canvas.setup",
		"makeBoxes": "Data.generate",
		"draw": "Canvas.drawBoxes"
	},
	factory: () => {
		return ( imports ) => {
			const { setupCanvas, makeBoxes, draw } = imports;
			setupCanvas();
			makeBoxes( 100 );
			draw();
		}
	}
} );