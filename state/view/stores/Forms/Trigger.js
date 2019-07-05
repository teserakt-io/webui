import {observable, action} from "mobx";

class Trigger {
    @observable type = Trigger.types;
    @observable settings = {};
    id = null;

    static types = [
        "TIME_INTERVAL",
        "CLIENT_SUBSCRIBED",
        "CLIENT_UNSUBSCRIBED",
    ];

    getTypes = () => Trigger.types;
    getType = () => this.type;
    getSettings = () => this.settings;
    getBaseSettings() {
        switch (this.getType()) {
            case "TIME_INTERVAL": {
                return  {
                    minutes: "*",
                    hours: "*",
                    days: "*",
                    month: "*",
                    weeks: "*",
                    years: "*",
                }
            }
            default:
                return {};
        }
    }

    @action
    clear() {
        this.id = null;
        this.type = Trigger.types[0];
        this.settings = this.getBaseSettings();
    }

    @action
    setType(value) {
        if(this.type !== value) {
            this.type = value;
            this.settings = this.getBaseSettings();
        }
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