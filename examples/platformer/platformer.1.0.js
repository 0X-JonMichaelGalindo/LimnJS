( ( window )=> {

let platformer = {};

const Limnaries = platformer.Limnaries = {},
	Listeners = platformer.Listeners = {},
	Passables = platformer.Passables = {};

platformer.e = async ( name, detail ) => {
	let alls = [];
	for( let l of Listeners[ name ] ) { let v = l( name, detail ); 
		if( v && ( typeof v.then === "function" ) ) alls.push( v ); }
	if( alls.length > 0 ) await Promise.all( alls );
	return true;
};

( ( platformer ) => {
const Limnaries = undefined,
	Listeners = undefined,
	Passables = undefined;
platformer._ = 
( platformer ) => {
	platformer.Limnaries[ platformer.name ] = platformer.factory();
	if( platformer.listen ) for( let l of platformer.listen ) {
		if( ! platformer.Listeners[ l ] ) platformer.Listeners[ l ] = [];
		platformer.Listeners[ l ].push( platformer.Limnaries[ platformer.name ] );
	}
}
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Main.start",
	factory: ( imports => {
		return () => {
        return () => {
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
    }
	} )( platformer.Passables[ "Main.start" ] = {"setupCanvas":"Canvas.setup","setupWorld":"World.setup","bindKeys":"IO.bindKeyboardEvents","startAnimationFrame":"Native.requestAnimationFrame","loop":"Main.loop"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Native.requestAnimationFrame",
	factory: ( imports => {
		return () => {
        return ( frameFunc ) => window.requestAnimationFrame( frameFunc );
    }
	} )( platformer.Passables[ "Native.requestAnimationFrame" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "World.setup",
	factory: ( imports => {
		return () => {
        return () => {
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
    }
	} )( platformer.Passables[ "World.setup" ] = {"getScreen":"Canvas.getCanvasContext","getWorld":"World.getWorldData","getCharacter":"World.getCharacterData"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "World.getWorldData",
	factory: ( imports => {
		return () => {
        const worldData = {
            platforms: []
        };
        return () => worldData;
    }
	} )( platformer.Passables[ "World.getWorldData" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "World.getCharacterData",
	factory: ( imports => {
		return () => {
        const characterData = {
            "x":0, "y":0, "w":0, "h":0,
            "v": { "x":0, "y":0 },
        }
        return () => characterData;
    }
	} )( platformer.Passables[ "World.getCharacterData" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.bindKeyboardEvents",
	factory: ( imports => {
		return () => {
		return () => {
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
	}
	} )( platformer.Passables[ "IO.bindKeyboardEvents" ] = {"listen":"Native.addGlobalEventListener","getKeyNames":"IO.getBoundKeyNamesByCode","breakLoop":"IO.breakGameLoop","emit":null} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Canvas.getCanvasContext",
	factory: ( imports => {
		return () => {
        let canvasContext = {
            cnv: null,
            ctx: null,
            w: -1,
            h: -1
        }
        return ( () => canvasContext );
    }
	} )( platformer.Passables[ "Canvas.getCanvasContext" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.EventHandlers.recordKeyState",
	factory: ( imports => {
		return () => {
        return ( eventName, eventDetail ) => {
            imports.getKeyStates()[ eventDetail.keyName ] = eventDetail.state;
        }
    }
	} )( platformer.Passables[ "IO.EventHandlers.recordKeyState" ] = {"getKeyStates":"IO.getKeyStates"} ),
	Listeners: platformer.Listeners,
	listen: ["IO.Events.setKeyState*"]
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Canvas.setup",
	factory: ( imports => {
		return () => {
        return () => {
            const { getRef } = imports;
            let canvasContext = getRef();
            canvasContext.cnv = document.body.appendChild( document.createElement( "canvas" ) );
            let w = canvasContext.cnv.width = canvasContext.w = 400,
                h = canvasContext.cnv.height = canvasContext.h = 400;
            canvasContext.ctx = canvasContext.cnv.getContext( "2d" );
            canvasContext.ctx.fillStyle = "rgb(220,220,220)";
            canvasContext.ctx.fillRect( 0,0,w,h );
        }
    }
	} )( platformer.Passables[ "Canvas.setup" ] = {"getRef":"Canvas.getCanvasContext"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Native.addGlobalEventListener",
	factory: ( imports => {
		return () => {
        return ( name, handle ) => window.addEventListener( name, handle );
    }
	} )( platformer.Passables[ "Native.addGlobalEventListener" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.breakGameLoop",
	factory: ( imports => {
		return () => {
        return () => { 
            imports.getGameState().flags.looping = false;
            console.log( "Broke game loop!" );
        }
    }
	} )( platformer.Passables[ "IO.breakGameLoop" ] = {"getGameState":"IO.getGameState"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.getKeyStates",
	factory: ( imports => {
		return () => {
        return () => imports.getGameState().keyStates;
    }
	} )( platformer.Passables[ "IO.getKeyStates" ] = {"getGameState":"IO.getGameState"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.getBoundKeyNamesByCode",
	factory: ( imports => {
		return () => {
        let keyNamesByCode = Object.freeze( {
            "37": "left-arrow",
            "38": "up-arrow",
            "39": "right-arrow",
            "40": "down-arrow",
            "27": "break"
        } );
        return () => keyNamesByCode;
    }
	} )( platformer.Passables[ "IO.getBoundKeyNamesByCode" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.getGameState",
	factory: ( imports => {
		return () => {
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
    }
	} )( platformer.Passables[ "IO.getGameState" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Main.loop",
	factory: ( imports => {
		return () => {
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
	} )( platformer.Passables[ "Main.loop" ] = {"updateTime":"IO.updateTime","simulate":"Simulator.main","draw":"Canvas.drawWorld","startAnimationFrame":"Native.requestAnimationFrame","loop":"Main.loop","stillLooping":"IO.getLoopingState"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.updateTime",
	factory: ( imports => {
		return () => {
        return t => {
            const { getState } = imports,
                state = getState();
            if( state.time === null )
                state.time = t;
            let dt = Math.max( 1, t - state.time );
            state.deltaTime = dt;
            state.time = t;
        }
    }
	} )( platformer.Passables[ "IO.updateTime" ] = {"getState":"IO.getGameState"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "IO.getLoopingState",
	factory: ( imports => {
		return () => {
        return () => imports.state().flags.looping;
    }
	} )( platformer.Passables[ "IO.getLoopingState" ] = {"state":"IO.getGameState"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.main",
	factory: ( imports => {
		return () => {
        return () => {
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
    }
	} )( platformer.Passables[ "Simulator.main" ] = {"getState":"IO.getGameState","getConfig":"Simulator.getConfiguration","jump":"Simulator.jump","strafe":"Simulator.strafe","fall":"Simulator.fall","frict":"Simulator.frict","move":"Simulator.move","keepInScreen":"Simulator.keepCharacterOnScreen"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Canvas.drawWorld",
	factory: ( imports => {
		return () => {
        return () => {
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
    }
	} )( platformer.Passables[ "Canvas.drawWorld" ] = {"getWorld":"World.getWorldData","getCharacter":"World.getCharacterData","getCanvas":"Canvas.getCanvasContext"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.move",
	factory: ( imports => {
		return () => {
        return t => {
            const { getChar } = imports,
                char = getChar();
            char.x += char.v.x * t;
            char.y += char.v.y * t;
        }
    }
	} )( platformer.Passables[ "Simulator.move" ] = {"getChar":"World.getCharacterData"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.strafe",
	factory: ( imports => {
		return () => {
		return t => {
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
	} )( platformer.Passables[ "Simulator.strafe" ] = {"getConfig":"Simulator.getConfiguration","getKeyStates":"IO.getKeyStates","getChar":"World.getCharacterData"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.fall",
	factory: ( imports => {
		return () => {
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
	} )( platformer.Passables[ "Simulator.fall" ] = {"getConfig":"Simulator.getConfiguration","getChar":"World.getCharacterData","hit":"World.checkCharacterPlatformCollision"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.getConfiguration",
	factory: ( imports => {
		return () => {
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
	} )( platformer.Passables[ "Simulator.getConfiguration" ] = {} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.jump",
	factory: ( imports => {
		return () => {
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
	} )( platformer.Passables[ "Simulator.jump" ] = {"getConfig":"Simulator.getConfiguration","getKeyStates":"IO.getKeyStates","getChar":"World.getCharacterData","checkHit":"World.checkCharacterPlatformCollision"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.keepCharacterOnScreen",
	factory: ( imports => {
		return () => {
        return () => {
            const { getChar, getScreen } = imports,
                char = getChar(),
                screen = getScreen();
            if( char.x < 0 ) char.x = 0;
            if( ( char.x + char.w ) > screen.w )
                char.x = screen.w - char.w;
        }
    }
	} )( platformer.Passables[ "Simulator.keepCharacterOnScreen" ] = {"getChar":"World.getCharacterData","getScreen":"Canvas.getCanvasContext"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "World.checkCharacterPlatformCollision",
	factory: ( imports => {
		return () => {
		return () => {
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
	} )( platformer.Passables[ "World.checkCharacterPlatformCollision" ] = {"getScreen":"Canvas.getCanvasContext","getConfig":"Simulator.getConfiguration","getWorld":"World.getWorldData","getChar":"World.getCharacterData"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
platformer._( {
	Limnaries: platformer.Limnaries,
	name: "Simulator.frict",
	factory: ( imports => {
		return () => {
        return t => {
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
    }
	} )( platformer.Passables[ "Simulator.frict" ] = {"getConfig":"Simulator.getConfiguration","getChar":"World.getCharacterData","checkHit":"World.checkCharacterPlatformCollision"} ),
	Listeners: platformer.Listeners,
	listen: false
} );
} )( platformer )


delete platformer.Listeners;
delete platformer.Limnaries;
delete platformer.Passables;
delete platformer._;
for( let name in Passables ) {
	let passables = Passables[ name ];
	for( let localReference in passables ) {
		if( localReference === "emit" )
			passables.emit = platformer.e;
			else passables[ localReference ] =
			Limnaries[ passables[ localReference ] ];
	}
	Object.freeze( passables );
}
Object.freeze( Passables );
delete platformer.e;

( ( preexistingLimnaryLookup ) => {
	window.platformer = async ( name ) => {
		let thisLimnary = Limnaries[ name.replace( /\//g, "." ) ];
		return ( typeof preexistingLimnaryLookup === "function" ) ?
			( thisLimnary || preexistingLimnaryLookup( name ) ) : thisLimnary;
	}
} )( window.platformer );

 
} )( window || global )