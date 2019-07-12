import {observable, action} from "mobx";
import validator from 'validator';
import regex from '../../../../utils/regex';
import {toCronString} from "../../../../utils/helpers";

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
                    seconds: "*",
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
                    seconds: expr[0],
                    minutes: expr[1],
                    hours: expr[2],
                    days: expr[3],
                    month: expr[4],
                    weeks: expr[5],
                    years: expr[6],
                };
                break;
            }
            default:
                break;
        }
    }

    isValid() {
        switch (this.type) {
            case "TIME_INTERVAL": {
                const cron = toCronString(this.settings);
                if(!regex.cron.test(cron))
                    return false;
            }
        }

        return true;
    }

    serialize() {
        const settings = {};
        switch (this.type) {
            case "TIME_INTERVAL": {
                settings["expr"] = toCronString(this.settings);
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