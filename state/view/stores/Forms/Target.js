import {observable, action} from "mobx";

class Target {
    static types = [
        "CLIENT",
        "TOPIC",
    ];
    id = null;
    @observable type = Target.types[0];
    @observable expr = "";

    getTypes = () => Target.types;
    @action
    clear() {
        this.id = null;
        this.type = Target.types[0];
        this.expr = "";
    }

    @action
    setType(value) {
        this.type = value;
    }

    @action
    setExpression(value){
        this.expr = value;
    }

    serialize() {
        const {id, type, expr} = this;
        return {
            id,
            type,
            expr
        };
    }

    @action
    parse(target, id = null) {
        this.id = id;
        this.type = target.type;
        this.expression = target.expression;
    }
}

export default Target;