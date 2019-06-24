import {observable} from "mobx";
import api from '../../../../api/api';

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

        this.rules = data.rules;
    }
}

export default Rules;