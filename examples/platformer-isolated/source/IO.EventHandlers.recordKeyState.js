platformer( "IO.EventHandlers.recordKeyState", {
    listen: "IO.Events.setKeyState*",
    imports: {
        "getKeyStates": "IO.getKeyStates"
    },
    factory: () => {
        return ( imports, eventName, eventDetail ) => {
            imports.getKeyStates()[ eventDetail.keyName ] = eventDetail.state;
        }
    }
})