import Trigger from "./Trigger";
import Rule from "./Rule";

class Forms {
    trigger = null;
    rule  = null;

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
}

export default Forms;