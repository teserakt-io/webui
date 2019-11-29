import { observable } from "mobx";

class Triggers {
    @observable triggers = [];
    @observable types = [
        "TIME_INTERVAL",
        "EVENT"
    ];

    get = () => this.triggers;
}

export default Triggers;
