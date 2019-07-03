import {observable} from "mobx";
import api from '../../../../api/api';
import moment from "moment";

class Rules {
    @observable rules = [];
    @observable current = 0;
    @observable onPage = 10;
    @observable page = 0;

    get = () => this.rules;
    getCurrent = () => this.current;
    getOnPage = () => this.onPage;
    getPage = () => this.page;

    async load() {
        const {data} = await api.rules.get();

        this.rules = data.rules || [];
    }

    async add(action, description, triggers = [], targets = []) {
        const b64triggers = triggers.map(trigger => {
            trigger.settings = btoa(JSON.stringify(trigger.settings));
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

    async remove(id) {
        const {data} = await api.rules.remove(id);

        this.rules = this.rules.filter(item => item.id !== id);
    }
}

export default Rules;