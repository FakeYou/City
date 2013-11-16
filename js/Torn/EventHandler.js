Torn.EventHandler = {
    _registeredEvents: {
        onmousemove: []
    }
}

Torn.EventHandler.init = function() {
    document.documentElement.onmousemove = Torn.EventHandler._onmousemove;
}

Torn.EventHandler.registerEvent = function(action, name, method, context) {
    Torn.EventHandler._registeredEvents[action].push({
        name: name,
        method: method,
        context: context
    });
}

Torn.EventHandler.unregisterEvent = function(action, name) {
    for(var i = 0; i < Torn.EventHandler._registeredEvents[action].length; i++) {
        var registeredEvent = Torn.EventHandler._registeredEvents[action][i];

        if(registeredEvent.name == name) {
            Torn.EventHandler._registeredEvents.splice(i, 1);
        }
    }
}

Torn.EventHandler._onmousemove = function(event) {
    for(var i = 0; i < Torn.EventHandler._registeredEvents['onmousemove'].length; i++) {
       var registeredEvent = Torn.EventHandler._registeredEvents['onmousemove'][i];

       var pos = Torn.EventHandler._translatePosition(event);
       event.pos = pos;

       registeredEvent.method.call(registeredEvent.context, event);
    }
}

Torn.EventHandler._translatePosition = function(event) {
    var vector = new THREE.Vector3(
        ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );

    Torn.projector.unprojectVector( vector, Torn.camera );

    var dir = vector.sub( Torn.camera.position ).normalize();

    var distance = - Torn.camera.position.y / dir.y;

    var pos = Torn.camera.position.clone().add( dir.multiplyScalar( distance ) );

    return pos;
}