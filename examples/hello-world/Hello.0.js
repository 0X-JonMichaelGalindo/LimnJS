( ( window )=> {

let Hello = {};

const Limnaries = Hello.Limnaries = {},
	Passables = Hello.Passables = {};



( ( Hello ) => {
const Limnaries = undefined,
	Passables = undefined;
Hello._ = 
( Hello ) => {
	Hello.method = Hello.factory(),
	Hello.limn = Hello.Limnaries[ Hello.name ] = ( (Hello) => {
		return function( ...parameters ) {
			return Hello.method.apply( this, [ Hello.limnaries, ...parameters ] )
		} } )(Object.freeze({ method: Hello.method, limnaries: Hello.limnaries }));

}
Hello._( {
	Limnaries: Hello.Limnaries,
	name: "hello-world",
	factory: function() {
        function helloWorldMethod( imports, name ) {
            document.body.innerText = "Hello, World! Hello, " + name + "!";
        }

        return helloWorldMethod;
    },
	limnaries: Hello.Passables[ "hello-world" ] = {},
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

( ( preexistingLimnaryLookup ) => {
	window.Hello = async ( name ) => {
		let thisLimnary = Limnaries[ name.replace( /\//g, "." ) ];
		return ( typeof preexistingLimnaryLookup === "function" ) ?
			( thisLimnary || preexistingLimnaryLookup( name ) ) : thisLimnary;
	}
} )( window.Hello );

 
} )( window || global )