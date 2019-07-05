import {observable, action, computed} from "mobx";
import api from '../../../../api/api';
import moment from "moment";
import {isBase64} from "../../../../utils/helpers";

class Rules {
    @observable rules = [];
    @observable current = 0;
    @observable onPage = 10;
    @observable page = 0;

    get = (id = null) => {
        if(id === null) {
            const start = this.page * this.onPage;
            return this.rules.slice(start, start+this.onPage);
        }

        return this.rules.find(rule => rule.id === id);
    };
    getCurrent = () => this.current;
    getOnPage = () => this.onPage;
    getPage = () => this.page;

    @action
    async load() {
        const {data} = await api.rules.get();

        const rules = data.rules || [];

        this.rules = rules.map(rule => {
            rule.triggers = rule.triggers || [];
            rule.targets = rule.targets || [];
            return rule;
        });
    }

    @action
    setPage(page) {
        this.page = page;
    }

    @action
    async add(action, description, triggers = [], targets = []) {
        const b64triggers = triggers.map(trigger => {
            // trigger.settings = btoa(JSON.stringify(trigger.settings));
            trigger.settings = "{}";
            return trigger;
        });

        const b64targets = targets.map(target => {
            target.settings = btoa(JSON.stringify(target.settings));
            return target;
        });
        const {data} = await api.rules.post(
            action,
            description,
            b64triggers,
            b64targets,
        );
        this.rules.push(data.rule);
    }

    @action
    async edit(id, action, description, triggers = [], targets = []) {
        const b64triggers = triggers.map(trigger => {
            trigger.settings = btoa(JSON.stringify(trigger.settings));
            return trigger;
        });

        const {data} = await api.rules.put(
            id,
            action,
            description,
            b64triggers,
            targets,
        );

        const index = this.rules.findIndex(rule => rule.id === data.rule.id);
        this.rules.splice(index, 1, data.rule);
    }

    @action
    async remove(id) {
        const {data} = await api.rules.remove(id);

        this.rules = this.rules.filter(item => item.id !== id);
        this.setPage(0);
    }
}

export default Rules;