( ( window )=> {

let boxes = {};

const Limnaries = boxes.Limnaries = {},
	Passables = boxes.Passables = {};



( ( boxes ) => {
const Limnaries = undefined,
	Passables = undefined;
boxes._ = 
( boxes ) => {
	boxes.method = boxes.factory(),
	boxes.limn = boxes.Limnaries[ boxes.name ] = ( (boxes) => {
		return function( ...parameters ) {
			return boxes.method.apply( this, [ boxes.limnaries, ...parameters ] )
		} } )(Object.freeze({ method: boxes.method, limnaries: boxes.limnaries }));

}
boxes._( {
	Limnaries: boxes.Limnaries,
	name: "Main.start",
	factory: () => {
		return ( imports ) => {
			const { setupCanvas, makeBoxes, draw } = imports;
			setupCanvas();
			makeBoxes( 100 );
			draw();
		}
	},
	limnaries: boxes.Passables[ "Main.start" ] = {"setupCanvas":"Canvas.setup","makeBoxes":"Data.generate","draw":"Canvas.drawBoxes"},
	listen: false
} );
boxes._( {
	Limnaries: boxes.Limnaries,
	name: "Data.generate",
	factory: () => {
        return ( imports, boxCount ) => {
            const { getRef, getScreen } = imports,
                ref = getRef(),
                screen = getScreen();
            ref.scale.x = screen.w * 0.9;
            ref.scale.y = screen.h * 0.9;
            ref.scale.w = screen.w * 0.1;
            ref.scale.h = screen.h * 0.1;
            for( let i=0; i<boxCount; i++ )
                ref.boxes.push( {
                    x: Math.random(),
                    y: Math.random(),
                    w: Math.random(),
                    h: Math.random()
                } );
        }
    },
	limnaries: boxes.Passables[ "Data.generate" ] = {"getRef":"Data.getDataObject","getScreen":"Canvas.getCanvasContext"},
	listen: false
} );
boxes._( {
	Limnaries: boxes.Limnaries,
	name: "Canvas.setup",
	factory: () => {
        return ( imports ) => {
            const { getRef } = imports;
            let canvasContext = getRef();
            canvasContext.cnv = document.body.appendChild( document.createElement( "canvas" ) );
            let w = canvasContext.cnv.width = canvasContext.w = 400,
                h = canvasContext.cnv.height = canvasContext.h = 400;
            canvasContext.ctx = canvasContext.cnv.getContext( "2d" );
            canvasContext.ctx.fillStyle = "rgb(220,220,220)";
            canvasContext.ctx.fillRect( 0,0,w,h );
        }
    },
	limnaries: boxes.Passables[ "Canvas.setup" ] = {"getRef":"Canvas.getCanvasContext"},
	listen: false
} );
boxes._( {
	Limnaries: boxes.Limnaries,
	name: "Canvas.drawBoxes",
	factory: () => {
        return ( imports ) => {
            const { getCanvas, getBoxes } = imports,
                { ctx, w, h } = getCanvas(),
                { boxes, scale } = getBoxes();
            ctx.fillStyle = "rgb(220,220,220)";
            ctx.fillRect( 0,0, w,h );
            ctx.strokeStyle = "rgb(150,150,150)";
            for( let b of boxes ) {
                ctx.strokeRect( 
                    b.x * scale.x,
                    b.y * scale.y,
                    b.w * scale.w,
                    b.h * scale.h
                )
            }
        }
    },
	limnaries: boxes.Passables[ "Canvas.drawBoxes" ] = {"getCanvas":"Canvas.getCanvasContext","getBoxes":"Data.getDataObject"},
	listen: false
} );
boxes._( {
	Limnaries: boxes.Limnaries,
	name: "Canvas.getCanvasContext",
	factory: () => {
        let canvasContext = {
            cnv: null,
            ctx: null,
            w: -1,
            h: -1
        }
        return ( () => canvasContext );
    },
	limnaries: boxes.Passables[ "Canvas.getCanvasContext" ] = {},
	listen: false
} );
boxes._( {
	Limnaries: boxes.Limnaries,
	name: "Data.getDataObject",
	factory: () => {
        let data = {
            boxes: [],
            scale: {
                x:0, y:0,
                w:0, h:0
            }
        }
        return ( () => data );
    },
	limnaries: boxes.Passables[ "Data.getDataObject" ] = {},
	listen: false
} );
} )( boxes )


delete boxes.Limnaries;
delete boxes.Passables;
delete boxes._;
for( let name in Passables ) {
	let passables = Passables[ name ];
	for( let localReference in passables ) {
		passables[ localReference ] =
			Limnaries[ passables[ localReference ] ];
	}
	Object.freeze( passables );
}
Object.freeze( Passables );

( ( preexistingLimnaryLookup ) => {
	window.boxes = async ( name ) => {
		let thisLimnary = Limnaries[ name.replace( /\//g, "." ) ];
		return ( typeof preexistingLimnaryLookup === "function" ) ?
			( thisLimnary || preexistingLimnaryLookup( name ) ) : thisLimnary;
	}
} )( window.boxes )
 
} )( window || global )