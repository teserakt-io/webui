import {observable, action} from "mobx";

class Trigger {
    @observable type = "";
    @observable settings = {};
    id = null;

    types = [
        "UNDEFINED_TRIGGER",
        "TIME_INTERVAL",
        "CLIENT_SUBSCRIBED",
        "CLIENT_UNSUBSCRIBED"
    ];

    baseSettings = {
        "TIME_INTERVAL": {
            minutes: "*",
            hours: "*",
            days: "*",
            month: "*",
            weeks: "*",
            years: "*",
        }
    };

    getType = () => this.type;
    getSettings = () => this.settings;

    @action
    clear() {
        this.id = null;
        this.type = this.types[0];
        this.settings = JSON.stringify({});
    }

    @action
    setType(value) {
        if(this.type !== value)
            this.settings = this.baseSettings[value];

        this.type = value;
    }

    @action
    setSetting(name, value) {
        this.settings[name] = value;
    }

    @action
    parse(trigger, id = null) {
        this.id = id;
        this.type = trigger.type;
        switch (this.type) {
            case "TIME_INTERVAL": {
                const expr = trigger.settings.expr.split(" ");
                this.settings = {
                    ...trigger.settings,
                    minutes: expr[0],
                    hours: expr[1],
                    days: expr[2],
                    month: expr[3],
                    weeks: expr[4],
                    years: expr[5],
                };
                break;
            }
            default:
                break;
        }
    }

    serialize() {
        const settings = {};
        switch (this.type) {
            case "TIME_INTERVAL": {
                settings["expr"] = this.settings.minutes + " " +
                    this.settings.hours + " " +
                    this.settings.days + " " +
                    this.settings.month + " " +
                    this.settings.weeks + " " +
                    this.settings.years;
                break;
            }
            default:
                break;
        }

        return {
            id: this.id,
            type: this.type,
            settings,
        };
    }
}

export default Trigger;