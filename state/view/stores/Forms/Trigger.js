import {observable, action} from "mobx";

class Trigger {
    @observable type = "";
    @observable settings = "";
    types = [
        "UNDEFINED_TRIGGER",
        "TIME_INTERVAL",
        "CLIENT_SUBSCRIBED",
        "CLIENT_UNSUBSCRIBED"
    ];

    @action
    clear() {
        this.type = this.types[0];
        this.settings = JSON.stringify("");
    }

    @action
    setType(value) {
        this.type = value;
        console.log(this);
    }
}

export default Trigger;