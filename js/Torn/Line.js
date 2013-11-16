Torn.Line = function(parent, points, color) {
    Torn.Entity.call(this, parent);

    this.points = points || [];
    this.color = color || 0xfff000;

    this.material = new THREE.LineBasicMaterial({
        color: this.color,
        linewidth: 1
    });

    this.geometry = new THREE.Geometry();

    this.mesh = new THREE.Line(
        this.geometry,
        this.material
    );

    for(var i = 0; i < points.length; i++) {
        var point = points[i];
        this.addPoint(point.x, point.y, point.z);
    }

    parent.add(this.mesh);
}

Torn.Line.prototype = Object.create(Torn.Entity.prototype);

Torn.Line.prototype.addPoint = function(x, y, z) {
    var x = x || 0;
    var y = y || 0;
    var z = z || 0;

    this.geometry.vertices.push(new THREE.Vector3(x, y, z));
}