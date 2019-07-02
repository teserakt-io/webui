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
        // this.rules = data.rules.map(rule => {
        //     rule.lastExectued = moment(rule.lastExectued);
        // });
    }

    async add(action, description, triggers = [], targets = []) {
        const {data} = await api.rules.post(
            action,
            description,
            triggers,
            targets,
        );

        this.rules.push(data.rule);
    }

    async remove(id) {
        const {data} = await api.rules.remove(id);

        this.rules = this.rules.filter(item => item.id !== id);
    }
}

export default Rules;