Torn.Point = function(parent) {
    Torn.Entity.call(this, parent);

    this.material = new THREE.MeshNormalMaterial({
        wireframe: false
    });

    this.geometry = new THREE.SphereGeometry(
        4
    );

    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );

    parent.add(this.mesh);
}

Torn.Point.prototype = Object.create(Torn.Entity.prototype);