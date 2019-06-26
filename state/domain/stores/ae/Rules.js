import {observable} from "mobx";
import api from '../../../../api/api';
import moment from "moment";

class Rules {
    @observable rules = [];
    @observable current = 0;
    @observable onPage = 10;
    @observable page = 0;

    types = [
        "UNDEFINED_ACTION",
        "KEY_ROTATION",
    ];

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

    async remove(id) {
        const {data} = await api.rules.remove(id);

        this.rules = this.rules.filter(item => item.id !== id);
    }
}

export default Rules;