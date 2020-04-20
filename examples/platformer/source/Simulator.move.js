platformer( "Simulator.move", {
    imports: {
        "getChar": "World.getCharacterData"
    },
    parameters: [
        "t:number",
    ],
    factory: () => {
        return t => {
            const { getChar } = imports,
                char = getChar();
            char.x += char.v.x * t;
            char.y += char.v.y * t;
        }
    }
})