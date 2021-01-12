import _ from 'lodash';

/// xxx(6) /*DiagramIdHelper*/

/// var r = n(2)/*lodash*/;  // 13 times
/// var a = n.n(r);
var DiagramIdHelper = new class {
    nextIdByPreviousId(e) {
        if (this.isDiagramEditorId(e)) {
            return this.nextDiagramEditorId();
        }
        if (this.isDiagramConnectionId(e)) {
            return this.nextDiagramConnectionId();
        }
        if (this.isDiagramArrowId(e)) {
            return this.nextDiagramArrowId();
        }
        if (this.isDiagramLinkedId(e)) {
            return this.nextDiagramLinkedEntityId();
        }
        if (this.isDiagramShapeId(e)) {
            return this.nextDiagramShapeId();
        }
        if (this.isDiagramIntersectionId(e)) {
            return this.nextDiagramIntersectionId();
        }
        if (this.isDiagramCompositeShapeId(e)) {
            return this.nextDiagramCompositeShapeId();
        }
        if (this.isDiagramGroupId(e)) {
            return this.nextDiagramGroupEntityId();
        }
        if (this.isTemporaryEntity(e)) {
            return this.nextTemporaryEntity();
        }
        if (this.isDiagramGuideId(e)) {
            return this.nextDiagramGuideId();
        }
        throw new Error("not support now");
    }
    nextId() {
        return "n" + Math.random();
    }
    nextDiagramGuideId(e) {
        return null != e ? "guide000000" + e : "guide" + Math.random().toString().substr(2);
    }
    nextDiagramEditorId() {
        return "de" + Math.random().toString().substr(2);
    }
    nextDiagramConnectionId() {
        return "dc" + Math.random().toString().substr(2);
    }
    nextDiagramArrowId() {
        return "da" + Math.random().toString().substr(2);
    }
    nextDiagramLinkedEntityId() {
        return "dl" + Math.random().toString().substr(2);
    }
    nextDiagramShapeId() {
        return "ds" + Math.random().toString().substr(2);
    }
    nextDiagramIntersectionId() {
        return "di" + Math.random().toString().substr(2);
    }
    nextDiagramCompositeShapeId() {
        return "dp" + Math.random().toString().substr(2);
    }
    nextDiagramGroupEntityId() {
        return "dg" + Math.random().toString().substr(2);
    }
    nextTemporaryEntity() {
        return "temp" + Math.random().toString().substr(2);
    }
    isDiagramGuideId(e) {
        return _.startsWith(e, "guide");
    }
    isDiagramArrowId(e) {
        return _.startsWith(e, "da");
    }
    isDiagramConnectionId(e) {
        return _.startsWith(e, "dc");
    }
    isDiagramEditorId(e) {
        return _.startsWith(e, "de");
    }
    isStrictDiagramEditorId(e) {
        return _.startsWith(e, "de") && Number.isSafeInteger(Number.parseInt(e[2], 10));
    }
    isDiagramShapeId(e) {
        return _.startsWith(e, "ds");
    }
    isDiagramShapeOrArrowOrCompositeId(e) {
        return this.isDiagramShapeId(e) || this.isDiagramArrowId(e) || this.isDiagramCompositeShapeId(e);
    }
    isDiagramIntersectionId(e) {
        return _.startsWith(e, "di");
    }
    isDiagramGroupId(e) {
        return _.startsWith(e, "dg");
    }
    isDiagramCompositeShapeId(e) {
        return _.startsWith(e, "dp");
    }
    isDiagramLinkedId(e) {
        return _.startsWith(e, "dl");
    }
    isTemporaryEntity(e) {
        return _.startsWith(e, "temp");
    }
    assignIdsForCompositeBlock(e) {
        _.values(e.elements).forEach((e) => {
            if (!this.isDiagramEditorId(e.id)) {
                e.id = this.nextId();
            }
            this.assignIds(e.lines);
        });
    }
    assignIdsForBlocks(e) {
        e.forEach((e) => {
            e.id = this.nextId();
            if ("composite" == e.type) {
                this.assignIdsForCompositeBlock(e);
            }
        });
    }
    assignIdsForLine(e) {
        if (e) {
            e.id = this.nextId();
            this.assignIdsForBlocks(e.blocks);
        }
    }
    assignIds(e) {
        return (e = _.cloneDeep(e)).forEach((e) => {
            this.assignIdsForLine(e);
        }),
        e;
    }
};

export default DiagramIdHelper