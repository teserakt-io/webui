import { action, observable } from "mobx";
import { toCronString } from "../../../../utils/helpers";
import regex from '../../../../utils/regex';

class Trigger {
    @observable type = Trigger.types;
    @observable settings = {};
    id = null;
    index = null;

    static types = [
        { value: "TIME_INTERVAL", label: "Period" },
        { value: "EVENT", label: "Event" },
    ];

    static eventTypeOptions = [
        { value: "CLIENT_SUBSCRIBED", label: "Client subscribed" },
        { value: "CLIENT_UNSUBSCRIBED", label: "Client unsubscribed" },
    ]

    getTypes = () => Trigger.types;
    getType = () => this.type;
    getSettings = () => this.settings;
    getBaseSettings() {
        switch (this.getType().value) {
            case "TIME_INTERVAL": {
                return {
                    minutes: "*",
                    hours: "*",
                    days: "*",
                    month: "*",
                    weeks: "*",
                    years: "*",
                }
            }
            case "EVENT": {
                return {
                    maxOccurrence: 1,
                    eventType: Trigger.eventTypeOptions[0],
                }
            }
            default:
                return {};
        }
    }

    @action
    clear() {
        this.id = null;
        this.index = null;
        this.type = Trigger.types[0];
        this.settings = this.getBaseSettings();
    }

    @action
    setType(value) {
        if (this.type.value !== value) {
            this.type = Trigger.types.find((elt) => elt.value === value);
            this.settings = this.getBaseSettings();
        }
    }

    @action
    setSetting(name, value) {
        this.settings[name] = value;
    }

    @action
    parse(trigger, index) {
        this.index = index
        this.id = trigger.id;
        this.type = Trigger.types.find((elt) => elt.value === trigger.type);
        switch (this.type.value) {
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
                this.settings = {
                    maxOccurrence: trigger.settings.maxOccurrence,
                    eventType: Trigger.eventTypeOptions.find((elt) => elt.value === trigger.settings.eventType),
                };
                break;
        }
    }

    isValid() {
        switch (this.type.value) {
            case "TIME_INTERVAL": {
                const cron = toCronString(this.settings);
                if (!regex.cron.test(cron)) {
                    return false;
                }
                break;
            }
            case "TIME_INTERVAL": {
                const maxOccurrence = parseInt(this.settings["maxOccurrence"], 10) || 0;
                if (maxOccurrence <= 0) {
                    return false;
                }
                break;
            }
        }

        return true;
    }

    serialize() {
        const settings = {};
        switch (this.type.value) {
            case "TIME_INTERVAL": {
                settings["expr"] = toCronString(this.settings);
                break;
            }
            default:
                settings["maxOccurrence"] = parseInt(this.settings["maxOccurrence"], 10);
                settings["eventType"] = this.settings["eventType"].value;
                break;
        }
        return {
            index: this.index,
            id: this.id,
            type: this.type.value,
            settings,
        };
    }
}

export default Trigger;
