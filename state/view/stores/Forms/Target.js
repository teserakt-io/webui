import { action, observable } from "mobx";

class Target {
    static types = [
        "CLIENT",
        "TOPIC",
    ];
    id = null;
    index = null;
    @observable type = Target.types[0];
    @observable expr = "";

    getTypes = () => Target.types;
    @action
    clear() {
        this.id = null;
        this.index = null;
        this.type = Target.types[0];
        this.expr = "";
    }

    @action
    setType(value) {
        this.type = value;
    }

    @action
    setExpression(value) {
        this.expr = value;
    }

    serialize() {
        const { index, id, type, expr } = this;
        return {
            index,
            id,
            type,
            expr
        };
    }

    @action
    parse(target, index) {
        this.index = index;
        this.id = target.id;
        this.type = target.type;
        this.expr = target.expr;
    }
}

export default Target;
