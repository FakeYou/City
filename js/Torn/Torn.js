Torn = {};

Torn.init = function() {
    Torn.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    //Torn.renderer.shadowMapEnabled = true;
    //Torn.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    Torn.scene = new THREE.Scene();

    Torn.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );

    Torn.controls = new THREE.OrbitControls(Torn.camera);
    Torn.camera.position.z = 512;
    Torn.camera.position.y = 512;
    Torn.camera.rotation.x =  -Math.PI / 4;
    //Torn.camera.lookAt(new THREE.Vector3(0,0,0));
    //Torn.camera.position.z = 100;

    Torn.renderStats = new Stats();
    Torn.renderStats.domElement.style.position = 'absolute';
    Torn.renderStats.domElement.style.top = '0px';
    Torn.renderStats.domElement.style.zIndex = 100;

    Torn.entities = {};
    Torn.EventHandler.init();

    Torn.clock = new THREE.Clock();
    Torn.projector = new THREE.Projector();

    //Math.seedrandom("as;<333>2bfasd/333asd>d");
    Torn.simplex = new SimplexNoise(Math.random);

    Torn.finder = new PF.AStarFinder ({
        heuristic: PF.Heuristic.euclidean
    });

    document.body.appendChild(Torn.renderStats.domElement);
    document.body.appendChild(Torn.renderer.domElement);

    Torn.onWindowResize();

    Torn.populate();
    Torn.render();
}

Torn.populate = function() {
    Torn.entities.city = new Torn.City(Torn.scene, 512, 512);
    Torn.entities.city.generate();

    Torn.axis = new THREE.AxisHelper(64);
    Torn.scene.add(Torn.axis);
}

Torn.render = function() {
    requestAnimationFrame(Torn.render);
    var delta = Torn.clock.getDelta();


    Torn.controls.update();
    Torn.renderStats.update();
    Torn.renderer.render(Torn.scene, Torn.camera);
}

Torn.onWindowResize = function(event) {
    Torn.renderer.setSize(window.innerWidth, window.innerHeight);

    Torn.camera.aspect = window.innerWidth / window.innerHeight;
    Torn.camera.updateProjectionMatrix();
}

Torn.getShader = function(name) {
    return document.getElementById(name).textContent;
}