Torn.City = function(parent, width, height) {
    Torn.Entity.call(this, parent);

    this.width = width || 512;
    this.height = height || 512;

    /*
    this.material = new THREE.MeshNormalMaterial({
        wireframe: true
    });

    this.geometry = new THREE.PlaneGeometry(
        this.width,
        this.height
    );

    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );
    */

    this.mesh = new THREE.Object3D();
    this.mesh.rotation.x = -Math.PI / 2;
    this.parent.add(this.mesh);
}

Torn.City.prototype = Object.create(Torn.Entity.prototype);

Torn.City.prototype.generate = function() {
    this.infrastructure = new Torn.Infrastructure(this.mesh, this.width, this.height);
    this.infrastructure.generate();
}