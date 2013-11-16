Torn.Entity = function(parent) {
    this.parent = parent || Torn.scene;
}

Torn.Entity.prototype.getParent = function() {
    return this.parent;
}

Torn.Entity.prototype.setParent = function(parent) {
    this.parent = parent;
}