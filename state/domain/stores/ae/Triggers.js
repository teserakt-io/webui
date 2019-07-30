import { observable } from "mobx";

class Triggers {
    @observable triggers = [];
    @observable types = [
        "UNDEFINED_TRIGGER",
        "TIME_INTERVAL",
        "EVENT"
    ];

    get = () => this.triggers;
}

export default Triggers;
