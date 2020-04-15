( ( window )=> {

let boxes = {};

const Listeners = boxes.Listeners = {},
	Modules = boxes.Modules = {},
	Passables = boxes.Passables = {};

boxes.e = async ( name, detail ) => {
	let alls = [];
	for( let l of Listeners[ name ] ) { let v = l( name, detail ); 
		if( v && ( typeof v.then === "function" ) ) alls.push( v ); }
	if( alls.length > 0 ) await Promise.all( alls );
	return true;
}

( ( boxes ) => {
const Listeners = undefined,
	Modules = undefined,
	Passables = undefined;
boxes._ = 
( boxes ) => {
	boxes.method = boxes.factory(),
	boxes.module = boxes.Modules[ boxes.name ] = ( (boxes) => {
		return function( ...parameters ) {
			return boxes.method.apply( this, [ boxes.imports, ...parameters ] )
		} } )(Object.freeze({ method: boxes.method, imports: boxes.imports }));
	if( boxes.emit ) boxes.imports.emit = boxes.emit;
	if( boxes.listen ) for( let l of boxes.listen ) {
		if( ! boxes.Listeners[ l ] ) boxes.Listeners[ l ] = [];
		boxes.Listeners[ l ].push( boxes.module );
	}
}
boxes._( {
	Modules: boxes.Modules, Listeners: boxes.Listeners,
	name: "Main.start",
	factory: () => {
		return ( imports ) => {
			const { setupCanvas, makeBoxes, draw } = imports;
			setupCanvas();
			makeBoxes( 100 );
			draw();
		}
	},
	imports: boxes.Passables[ "Main.start" ] = {"setupCanvas":"Canvas.setup","makeBoxes":"Data.generate","draw":"Canvas.drawBoxes"},
	emit: false,
	listen: false
} );
boxes._( {
	Modules: boxes.Modules, Listeners: boxes.Listeners,
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
	imports: boxes.Passables[ "Canvas.setup" ] = {"getRef":"Canvas.getCanvasContext"},
	emit: false,
	listen: false
} );
boxes._( {
	Modules: boxes.Modules, Listeners: boxes.Listeners,
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
	imports: boxes.Passables[ "Data.generate" ] = {"getRef":"Data.getDataObject","getScreen":"Canvas.getCanvasContext"},
	emit: false,
	listen: false
} );
boxes._( {
	Modules: boxes.Modules, Listeners: boxes.Listeners,
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
	imports: boxes.Passables[ "Canvas.drawBoxes" ] = {"getCanvas":"Canvas.getCanvasContext","getBoxes":"Data.getDataObject"},
	emit: false,
	listen: false
} );
boxes._( {
	Modules: boxes.Modules, Listeners: boxes.Listeners,
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
	imports: boxes.Passables[ "Canvas.getCanvasContext" ] = {},
	emit: false,
	listen: false
} );
boxes._( {
	Modules: boxes.Modules, Listeners: boxes.Listeners,
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
	imports: boxes.Passables[ "Data.getDataObject" ] = {},
	emit: false,
	listen: false
} );
} )( boxes )


delete boxes.Listeners;
delete boxes.Modules;
delete boxes.Passables;
delete boxes._;
delete boxes.e;
for( let name in Passables ) {
	let passables = Passables[ name ];
	for( let localReference in passables ) {
		if( localReference === "emit" ) continue;
		passables[ localReference ] =
			Modules[ passables[ localReference ] ];
	}
	Object.freeze( passables );
}
Object.freeze( Passables );

( ( preexistingLimnaryLookup ) => {
	window.boxes = async ( name ) => {
		let thisLimnary = Modules[ name.replace( /\//g, "." ) ];
		return ( typeof preexistingLimnaryLookup === "function" ) ?
			( thisLimnary || preexistingLimnaryLookup( name ) ) : thisLimnary;
	}
} )( window.boxes )
 
} )( window || global )