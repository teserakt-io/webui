import {observable} from "mobx";

class Triggers {
    @observable triggers = [];
    @observable types = [
        "UNDEFINED_TRIGGER",
        "TIME_INTERVAL",
        "CLIENT_SUBSCRIBED",
        "CLIENT_UNSUBSCRIBED"
    ];

    get = () => this.triggers;
}

export default Triggers;