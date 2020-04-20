( ( window )=> {

let Hello = {};

const Limnaries = Hello.Limnaries = {},
	Passables = Hello.Passables = {};



( ( Hello ) => {
const Limnaries = undefined,
	Passables = undefined;
Hello._ = 
( Hello ) => {
	Hello.Limnaries[ Hello.name ] = Hello.factory();

}
Hello._( {
	Limnaries: Hello.Limnaries,
	name: "hello-world",
	factory: ( imports => {
		return function() {
        function helloWorldMethod( name ) {
            document.body.innerText = "Hello, World! Hello, " + name + "!";
        }

        return helloWorldMethod;
    }
	} )( Hello.Passables[ "hello-world" ] = {} ),
	listen: false
} );
} )( Hello )


delete Hello.Limnaries;
delete Hello.Passables;
delete Hello._;
for( let name in Passables ) {
	let passables = Passables[ name ];
	for( let localReference in passables ) {
			passables[ localReference ] =
			Limnaries[ passables[ localReference ] ];
	}
	Object.freeze( passables );
}
Object.freeze( Passables );
delete Hello.e;

( ( preexistingLimnaryLookup ) => {
	window.Hello = async ( name ) => {
		let thisLimnary = Limnaries[ name.replace( /\//g, "." ) ];
		return ( typeof preexistingLimnaryLookup === "function" ) ?
			( thisLimnary || preexistingLimnaryLookup( name ) ) : thisLimnary;
	}
} )( window.Hello );

 
} )( window || global )