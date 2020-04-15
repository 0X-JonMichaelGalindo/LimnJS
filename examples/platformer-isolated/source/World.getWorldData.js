platformer.Outline( "World.Types.platform*", {
    "x":"number", "y":"number",
    "w":"number", "h":"number"
} );
platformer.Outline( "World.Types.world*", {
    platforms: [ "World.Types.platform*" ]
} );

platformer( "World.getWorldData", {
    returns: "World.Types.world*",
    factory: () => {
        const worldData = {
            platforms: []
        };
        return () => worldData;
    }
} );