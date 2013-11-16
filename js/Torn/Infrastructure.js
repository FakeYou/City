Torn.Infrastructure = function(parent, width, height) {
    Torn.Entity.call(this, parent);

    this.width = width;
    this.height = height;

    this.sites = [];
    this.boundingbox = {
        xl: -this.width / 2,
        xr: this.width / 2,
        yt: -this.height / 2,
        yb: this.height / 2
    };

    this.quad = new Quadtree({
        x: -this.width / 2,
        y: -this.height / 2,
        width: this.width,
        height: this.height
    });

    Torn.EventHandler.registerEvent('onmousemove', 'lol', this.mousemove, this);
}

Torn.Infrastructure.prototype = Object.create(Torn.Entity.prototype);

Torn.Infrastructure.prototype.mousemove = function(event) {
    var radius = 100;

    var nearby = this.quad.retrieve({
        x: event.pos.x - radius / 2,
        y: event.pos.z - radius / 2,
        width: radius,
        height: radius
    })

    for(var i = 0; i < nearby.length; i++) {
        var node = nearby[i];
        var dx = Math.abs(event.pos.x - node.x);
        var dy = Math.abs(-event.pos.z - node.y);
        var distance = Math.sqrt(dx * dx + dy * dy);

        var size = (radius - distance) / 50;

        if(size < 1) {
            size = 1;
        }
        if(size > 4) {
            size = 4;
        }

        node.mesh.mesh.scale.set(size, size, size);
    }
}

Torn.Infrastructure.prototype.generate = function() {
    this.sites =        this.generateSites(500);
    this.diagram =      this.generateVoronoi();
    this.borders =      this.getDiagramBorders();
    this.junctions =    this.getDiagramJunctions();

    for(var i = 0; i < this.borders.length; i++) {
        var line = new Torn.Line(this.parent, this.borders[i], 0x000001);
    }
}

Torn.Infrastructure.prototype.generateSites = function(amount) {
    var sites = [];

    for(var i = 0; i < amount; i++) {
        var site = {
            x: getRandomFloat(this.boundingbox.xl, this.boundingbox.xr),
            y: getRandomFloat(this.boundingbox.yt, this.boundingbox.yb)
        };

        sites.push(site);
    }

    return sites;
}

Torn.Infrastructure.prototype.generateVoronoi = function() {
    var voronoi = new Voronoi();

    return voronoi.compute(this.sites, this.boundingbox);
}

Torn.Infrastructure.prototype.getDiagramBorders = function() {
    var borders = [];
    for(var i = 0; i < this.diagram.edges.length; i++) {
        var edge = this.diagram.edges[i];
        var border = [];

        border.push(new THREE.Vector3(edge.va.x, edge.va.y, 0));
        border.push(new THREE.Vector3(edge.vb.x, edge.vb.y, 0));

        borders.push(border);
    }

    return borders;
}

Torn.Infrastructure.prototype.getDiagramJunctions = function() {
    var grid = new PF.Grid();

    for(var i = 0; i < this.diagram.cells.length; i++) {
        var cell = this.diagram.cells[i];

        for(var j = 0; j < cell.halfedges.length; j++) {
            var halfedge = cell.halfedges[j];

            var start = halfedge.getStartpoint();
            var end = halfedge.getEndpoint();

            var startNode = grid.addNode(start.x, start.y);
            var endNode = grid.addNode(end.x, end.y);

            grid.setNeighbor(startNode, endNode);
            grid.setNeighbor(endNode, startNode);
        }
    }

    for(var i = 0; i < grid.nodes.length; i++) {
        var node = grid.nodes[i];
        node.width = 1;
        node.height = 1;
        this.quad.insert(node);

        var point = new Torn.Point(this.parent);
        point.mesh.position.set(node.x, node.y, 0);
        node.mesh = point;
    }

    return grid;
}
