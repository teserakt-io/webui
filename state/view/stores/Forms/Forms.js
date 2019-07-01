import Trigger from "./Trigger";

class Forms {
    trigger = null;

    getTrigger() {
        if(this.trigger === null)
            this.trigger = new Trigger();

        return this.trigger;
    }
}

export default Forms;