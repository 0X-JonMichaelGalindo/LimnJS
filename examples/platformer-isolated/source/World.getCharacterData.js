platformer.Outline( "World.character*", {
    "x":"number",
    "y":"number",
    "v": {
        "x":"number",
        "y":"number",
    },
    "w":"number",
    "h":"number",
} )

platformer( "World.getCharacterData", {
    returns: "World.character*",
    factory: () => {
        const characterData = {
            "x":0, "y":0, "w":0, "h":0,
            "v": { "x":0, "y":0 },
        }
        return () => characterData;
    }
} )