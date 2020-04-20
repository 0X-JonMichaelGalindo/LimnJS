platformer( "IO.EventHandlers.recordKeyState", {
    listen: "IO.Events.setKeyState*",
    imports: {
        "getKeyStates": "IO.getKeyStates"
    },
    factory: () => {
        return ( eventName, eventDetail ) => {
            imports.getKeyStates()[ eventDetail.keyName ] = eventDetail.state;
        }
    }
})