import {action, observable} from 'mobx';
class Rule {
    static types = [
        "UNDEFINED_ACTION",
        "KEY_ROTATION",
    ];

    @observable type = Rule.types[0];
    @observable triggers = [];
    @observable targets = [];

    getType = () => this.type;
    getTriggers = () => this.triggers;

    @action
    setType(value) {
        this.type = value;
    }

    @action
    set(name, value) {
        this[name] = value;
        console.log(this);
    }

    @action
    addTrigger(trigger) {
        this.triggers.push(trigger);
    }

    @action
    removeTrigger(index) {
        console.log(index);
        this.triggers = this.triggers.filter((trigger, cur) => index !== cur);
    }
}

export default Rule;