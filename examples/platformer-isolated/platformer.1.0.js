( ( window )=> {

let platformer = {};

const Listeners = platformer.Listeners = {},
	Limnaries = platformer.Limnaries = {},
	Passables = platformer.Passables = {};

platformer.e = async ( name, detail ) => {
	let alls = [];
	for( let l of Listeners[ name ] ) { let v = l( name, detail ); 
		if( v && ( typeof v.then === "function" ) ) alls.push( v ); }
	if( alls.length > 0 ) await Promise.all( alls );
	return true;
}

( ( platformer ) => {
const Listeners = undefined,
	Limnaries = undefined,
	Passables = undefined;
platformer._ = 
( platformer ) => {
	platformer.method = platformer.factory(),
	platformer.limn = platformer.Limnaries[ platformer.name ] = ( (platformer) => {
		return function( ...parameters ) {
			return platformer.method.apply( this, [ platformer.limnaries, ...parameters ] )
		} } )(Object.freeze({ method: platformer.method, limnaries: platformer.limnaries }));
	if( platformer.emit ) platformer.limnaries.emit = platformer.emit;
	if( platformer.listen ) for( let l of platformer.listen ) {
		if( ! platformer.Listeners[ l ] ) platformer.Listeners[ l ] = [];
		platformer.Listeners[ l ].push( platformer.limn );
	}
}
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Main.start",
	factory: () => {
        return ( imports ) => {
            const { 
                setupCanvas, 
                setupWorld, 

                bindKeys,

                startAnimationFrame, 
                loop,
            } = imports;

            setupCanvas();
            setupWorld();
            bindKeys();
            startAnimationFrame( loop );
        }
    },
	limnaries: platformer.Passables[ "Main.start" ] = {"setupCanvas":"Canvas.setup","setupWorld":"World.setup","bindKeys":"IO.bindKeyboardEvents","startAnimationFrame":"Native.requestAnimationFrame","loop":"Main.loop"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
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
	limnaries: platformer.Passables[ "Canvas.setup" ] = {"getRef":"Canvas.getCanvasContext"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "World.setup",
	factory: () => {
        return ( imports ) => {
            const { getScreen, getWorld, getCharacter } = imports;
            let screen = getScreen(),
                w = screen.w,
                h = screen.h
                worldObj = getWorld();
            worldObj.platforms = [
                { x:w*0.25, y:h*0.25, w:w*0.25, h:h*0.05 },
                { x:w*0.5,y:h*0.5, w:w*0.25, h:h*0.05 },
                { x:w*0.75,y:h*0.75, w:w*0.1875, h:h*0.05 },
                { x:w*0.875, y:h*0.875, w:w*0.125, h:h*0.05 }
            ];
            let character = getCharacter();
            character.x = w * 0.5;
            character.y = h * 0.9;
            character.h = h * 0.1;
            character.w = h * 0.05;
        }
    },
	limnaries: platformer.Passables[ "World.setup" ] = {"getScreen":"Canvas.getCanvasContext","getWorld":"World.getWorldData","getCharacter":"World.getCharacterData"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.bindKeyboardEvents",
	factory: () => {
		return imports => {
			const { listen, emit, getKeyNames, breakLoop } = imports,
				keyNames = getKeyNames();
			listen( "keydown", ( info ) => {
				const keyName = keyNames[ info.which.toString() ],
					state = true;
				if( keyName === "break" ) {}
				else if( keyName ) emit( "IO.Events.setKeyState*", {keyName,state} );
			} );
			listen( "keyup", ( info ) => {
				const keyName = keyNames[ info.which.toString() ],
					state = false;
				if( keyName === "break" ) { breakLoop(); }
				else if( keyName ) emit( "IO.Events.setKeyState*", {keyName,state} );
			} );
		}
	},
	limnaries: platformer.Passables[ "IO.bindKeyboardEvents" ] = {"listen":"Native.addGlobalEventListener","getKeyNames":"IO.getBoundKeyNamesByCode","breakLoop":"IO.breakGameLoop"},
	emit: platformer.e,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Native.requestAnimationFrame",
	factory: () => {
        return ( _, frameFunc ) => window.requestAnimationFrame( frameFunc );
    },
	limnaries: platformer.Passables[ "Native.requestAnimationFrame" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Main.loop",
	factory: () => {
		return ( imports, t ) => {
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
	},
	limnaries: platformer.Passables[ "Main.loop" ] = {"updateTime":"IO.updateTime","simulate":"Simulator.main","draw":"Canvas.drawWorld","startAnimationFrame":"Native.requestAnimationFrame","loop":"Main.loop","stillLooping":"IO.getLoopingState"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
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
	limnaries: platformer.Passables[ "Canvas.getCanvasContext" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "World.getWorldData",
	factory: () => {
        const worldData = {
            platforms: []
        };
        return () => worldData;
    },
	limnaries: platformer.Passables[ "World.getWorldData" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "World.getCharacterData",
	factory: () => {
        const characterData = {
            "x":0, "y":0, "w":0, "h":0,
            "v": { "x":0, "y":0 },
        }
        return () => characterData;
    },
	limnaries: platformer.Passables[ "World.getCharacterData" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.EventHandlers.recordKeyState",
	factory: () => {
        return ( imports, eventName, eventDetail ) => {
            imports.getKeyStates()[ eventDetail.keyName ] = eventDetail.state;
        }
    },
	limnaries: platformer.Passables[ "IO.EventHandlers.recordKeyState" ] = {"getKeyStates":"IO.getKeyStates"},
	emit: false,
	listen: ["IO.Events.setKeyState*"]
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Native.addGlobalEventListener",
	factory: () => {
        return ( _, name, handle ) => window.addEventListener( name, handle );
    },
	limnaries: platformer.Passables[ "Native.addGlobalEventListener" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.getBoundKeyNamesByCode",
	factory: () => {
        let keyNamesByCode = Object.freeze( {
            "37": "left-arrow",
            "38": "up-arrow",
            "39": "right-arrow",
            "40": "down-arrow",
            "27": "break"
        } );
        return () => keyNamesByCode;
    },
	limnaries: platformer.Passables[ "IO.getBoundKeyNamesByCode" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.breakGameLoop",
	factory: () => {
        return imports => { 
            imports.getGameState().flags.looping = false;
            console.log( "Broke game loop!" );
        }
    },
	limnaries: platformer.Passables[ "IO.breakGameLoop" ] = {"getGameState":"IO.getGameState"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.updateTime",
	factory: () => {
        return ( imports, t ) => {
            const { getState } = imports,
                state = getState();
            if( state.time === null )
                state.time = t;
            let dt = Math.max( 1, t - state.time );
            state.deltaTime = dt;
            state.time = t;
        }
    },
	limnaries: platformer.Passables[ "IO.updateTime" ] = {"getState":"IO.getGameState"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.main",
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
    },
	limnaries: platformer.Passables[ "Simulator.main" ] = {"getState":"IO.getGameState","getConfig":"Simulator.getConfiguration","jump":"Simulator.jump","strafe":"Simulator.strafe","fall":"Simulator.fall","frict":"Simulator.frict","move":"Simulator.move","keepInScreen":"Simulator.keepCharacterOnScreen"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Canvas.drawWorld",
	factory: () => {
        return ( imports ) => {
            const { getWorld, getCharacter, getCanvas } = imports,
                { cnv, ctx, w, h } = getCanvas(),
                { platforms } = getWorld();
            ctx.fillStyle = "rgb(240,240,240)";
            ctx.fillRect( 0,0,w,h );
            ctx.fillStyle = "rgb(128,128,128)";
            for( let p of platforms ) {
                ctx.fillRect( p.x, p.y, p.w, p.h );
            }
            ctx.fillStyle = "rgb(50,128,220)";
            let char = getCharacter();
            ctx.fillRect( char.x, char.y, char.w, char.h );
        }
    },
	limnaries: platformer.Passables[ "Canvas.drawWorld" ] = {"getWorld":"World.getWorldData","getCharacter":"World.getCharacterData","getCanvas":"Canvas.getCanvasContext"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.getLoopingState",
	factory: () => {
        return imports => imports.state().flags.looping;
    },
	limnaries: platformer.Passables[ "IO.getLoopingState" ] = {"state":"IO.getGameState"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.getKeyStates",
	factory: () => {
        return imports => imports.getGameState().keyStates;
    },
	limnaries: platformer.Passables[ "IO.getKeyStates" ] = {"getGameState":"IO.getGameState"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "IO.getGameState",
	factory: () => {
        let gameState = {
            flags: {
                "looping": true
            },
            "keyStates": {
                "left-arrow": false,
                "up-arrow": false,
                "right-arrow": false,
                "down-arrow": false,
            },
            "time": null,
            "deltaTime": 1
        }
        return () => gameState;
    },
	limnaries: platformer.Passables[ "IO.getGameState" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.getConfiguration",
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
    },
	limnaries: platformer.Passables[ "Simulator.getConfiguration" ] = {},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.strafe",
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
	},
	limnaries: platformer.Passables[ "Simulator.strafe" ] = {"getConfig":"Simulator.getConfiguration","getKeyStates":"IO.getKeyStates","getChar":"World.getCharacterData"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.jump",
	factory: () => {
		return ( imports, t ) => {
			const { getConfig, getKeyStates, getChar, checkHit } = imports,
				config = getConfig(),
				keys = getKeyStates(),
				char = getChar(),
				hit = checkHit();
			if( hit.depth === 0 && keys[ "up-arrow" ] ) 
				char.v.y -= t * config.jumpAcceleration;
		}
	},
	limnaries: platformer.Passables[ "Simulator.jump" ] = {"getConfig":"Simulator.getConfiguration","getKeyStates":"IO.getKeyStates","getChar":"World.getCharacterData","checkHit":"World.checkCharacterPlatformCollision"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.fall",
	factory: () => {
		return ( imports, t ) => {
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
	},
	limnaries: platformer.Passables[ "Simulator.fall" ] = {"getConfig":"Simulator.getConfiguration","getChar":"World.getCharacterData","hit":"World.checkCharacterPlatformCollision"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.frict",
	factory: () => {
        return ( imports, t ) => {
            const { getConfig, getChar, checkHit } = imports,
                config = getConfig(),
                char = getChar(),
                hit = checkHit();
            if( Math.abs( char.v.x ) > config.limits.velocity.x )
                char.v.x = ( char.v.x > 0 ) ?
                    config.limits.velocity.x : -config.limits.velocity.x;
            if( Math.abs( char.v.y ) > config.limits.velocity.y )
                char.v.y = ( char.v.y > 0 ) ?
                config.limits.velocity.y : -config.limits.velocity.y;
            //apply friction in air too, for better control
            char.v.x *= config.coefficientOfFriction ** t;
        }
    },
	limnaries: platformer.Passables[ "Simulator.frict" ] = {"getConfig":"Simulator.getConfiguration","getChar":"World.getCharacterData","checkHit":"World.checkCharacterPlatformCollision"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.move",
	factory: () => {
        return ( imports, t ) => {
            const { getChar } = imports,
                char = getChar();
            char.x += char.v.x * t;
            char.y += char.v.y * t;
        }
    },
	limnaries: platformer.Passables[ "Simulator.move" ] = {"getChar":"World.getCharacterData"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "Simulator.keepCharacterOnScreen",
	factory: () => {
        return imports => {
            const { getChar, getScreen } = imports,
                char = getChar(),
                screen = getScreen();
            if( char.x < 0 ) char.x = 0;
            if( ( char.x + char.w ) > screen.w )
                char.x = screen.w - char.w;
        }
    },
	limnaries: platformer.Passables[ "Simulator.keepCharacterOnScreen" ] = {"getChar":"World.getCharacterData","getScreen":"Canvas.getCanvasContext"},
	emit: false,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries, Listeners: platformer.Listeners,
	name: "World.checkCharacterPlatformCollision",
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
	},
	limnaries: platformer.Passables[ "World.checkCharacterPlatformCollision" ] = {"getScreen":"Canvas.getCanvasContext","getConfig":"Simulator.getConfiguration","getWorld":"World.getWorldData","getChar":"World.getCharacterData"},
	emit: false,
	listen: false
} );
} )( platformer )


delete platformer.Listeners;
delete platformer.Limnaries;
delete platformer.Passables;
delete platformer._;
delete platformer.e;
for( let name in Passables ) {
	let passables = Passables[ name ];
	for( let localReference in passables ) {
		if( localReference === "emit" ) continue;
		passables[ localReference ] =
			Limnaries[ passables[ localReference ] ];
	}
}

( ( preexistingLimnaryLookup ) => {
	window.platformer = async ( name ) => {
		let thisLimnary = Limnaries[ name.replace( /\//g, "." ) ];
		return ( typeof preexistingLimnaryLookup === "function" ) ?
			( thisLimnary || preexistingLimnaryLookup( name ) ) : thisLimnary;
	}
} )( window.platformer )
 
} )( window || global )