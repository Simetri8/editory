import WorkerInitializer from './WorkerInitializer';

/// xxx(228) /*SpellCheckRunner*/

/// var r = n(178)/*WorkerInitializer*/;  // 1 times
var SpellCheckRunner = new class {
    constructor() {
        this.id = Math.random().toString();
        this.walls = []
    }
    getWall(e) {
        var t = this.walls.find(t => t.language === e);
        if (!t) {
            t = {
                wall: new WorkerInitializer("spell-check.worker"),
                language: e
            };
            this.walls.push(t);
            t.wall.request({
                action: "init",
                language: e
            },
            this.id)
        };
        return t.wall
    }
    preload(e) {
        this.getWall(e)
    }
    request(e, t) {
        return this.getWall(t).request(e, this.id)
    }
}

export default SpellCheckRunner