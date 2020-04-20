platformer( "Simulator.frict", {
    imports:{
        "getConfig": "Simulator.getConfiguration",
        "getChar": "World.getCharacterData",
        "checkHit": "World.checkCharacterPlatformCollision"
    },
    parameters:[ "t:number" ],
    factory: () => {
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
}, "Verb form of friction. Slow down the character." )