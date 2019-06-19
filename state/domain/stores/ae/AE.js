import Rules from "./Rules";
import Triggers from "./Triggers";
import Targets from "./Targets";

class AE {
    constructor() {
        this.rules = new Rules();
        this.triggers = new Triggers();
        this.targets = new Targets();
    }
}

export default AE;

