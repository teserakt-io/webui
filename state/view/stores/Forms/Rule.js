import {action, observable} from 'mobx';
class Rule {
    static types = [
        "UNDEFINED_ACTION",
        "KEY_ROTATION",
    ];

    @observable type = Rule.types[0];
    @observable description = "";
    @observable triggers = [];
    @observable targets = [];

    getType = () => this.type;
    getTriggers = () => this.triggers;
    getTargets = () => this.targets;

    @action
    setType(value) {
        this.type = value;
    }

    @action
    set(name, value) {
        this[name] = value;
    }

    @action
    saveTrigger(trigger) {
        if(trigger.id !== null && trigger.id !== 'undefined') {
            this.triggers[trigger.id] = trigger;
        }
        else
            this.triggers.push(trigger);
    }

    @action
    removeTrigger(index) {
        this.triggers = this.triggers.filter((trigger, cur) => index !== cur);
    }

    @action
    saveTarget(target) {
        if(target.id !== null && target.id !== 'undefined') {
            this.targets[target.id] = target;
        }
        else
            this.targets.push(target);
    }

    @action
    removeTarget(index) {
        this.targets = this.targets.filter((target, cur) => index !== cur);
    }

    serialize() {
        const {type, description, targets, triggers} = this;

        return {
            type,
            description,
            targets,
            triggers,
        };
    }
}

export default Rule;