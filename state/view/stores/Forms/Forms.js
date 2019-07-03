import Trigger from "./Trigger";
import Rule from "./Rule";
import Target from "./Target";

class Forms {
    trigger = null;
    rule  = null;
    target = null;

    getTrigger() {
        if(this.trigger === null)
            this.trigger = new Trigger();

        return this.trigger;
    }

    getRule() {
        if(this.rule === null)
            this.rule = new Rule();

        return this.rule;
    }

    getTarget() {
        if(this.target === null)
            this.target = new Target();

        return this.target;
    }
}

export default Forms;