import { action, observable } from "mobx";
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

    static timeIntervalOptions = [
        { label: 'Every minute', value: '0 0/1 * 1/1 * ? *' },
        { label: 'Every hour', value: '0 0 0/1 1/1 * ? *' },
        { label: 'Every 6 hours', value: '0 */6 * * *' },
        { label: 'Every 12 hours', value: '0 0 0/12 1/1 * ? *' },
        { label: 'Every day', value: '0 0 0 1/1 * ? *' },
        { label: 'Every week', value: '0 0 0 ? * MON *' },
        { label: 'Every month', value: '0 0 0 1 1/1 ? *' },
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
                return Trigger.timeIntervalOptions[0];
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
        if (name.length > 0) {
            this.settings[name] = value;
        } else {
            this.settings = value;
        }
    }

    @action
    parse(trigger, index) {
        this.index = index
        this.id = trigger.id;
        this.type = Trigger.types.find((elt) => elt.value === trigger.type);
        switch (this.type.value) {
            case "TIME_INTERVAL": {
                this.settings = Trigger.timeIntervalOptions.find((elt) => elt.value === trigger.settings.expr);
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
                if (!regex.cron.test(this.settings.value)) {
                    return false;
                }
                break;
            }
            case "EVENT": {
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
                settings["expr"] = this.settings.value;
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
