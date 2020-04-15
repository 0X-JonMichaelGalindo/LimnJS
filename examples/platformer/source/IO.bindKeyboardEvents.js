platformer.Include( "IO.EventHandlers.recordKeyState" );

platformer.Outline( "IO.Events.setKeyState*", {
	"keyName": "string",
	"state": "boolean",
} );

platformer( "IO.bindKeyboardEvents", {
	imports: {
		"listen": "Native.addGlobalEventListener",
		"getKeyNames": "IO.getBoundKeyNamesByCode",
		"breakLoop": "IO.breakGameLoop"
	},
	emits: "IO.Events.setKeyState*",
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
	}
} )