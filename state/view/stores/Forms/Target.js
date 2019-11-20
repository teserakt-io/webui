import { action, observable } from "mobx";

class Target {
    static types = [
        { value: "CLIENT", label: "Client" },
        { value: "TOPIC", label: "Topic" },
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
        this.type = Target.types.find((elt) => elt.value === value);
    }

    @action
    setExpression(value) {
        this.expr = value;
    }

    serialize() {
        const { index, id, type, expr } = this;
        return {
            index: index,
            id: id,
            type: type.value,
            expr: expr
        };
    }

    @action
    parse(target, index) {
        this.index = index;
        this.id = target.id;
        this.type = Target.types.find((elt) => elt.value === target.type);
        this.expr = target.expr;
    }
}

export default Target;
