import { action, observable } from "mobx";
import api from '../../../../api/api';
import { Store } from "../../../Store";

class Rules {
    @observable rules = [];
    @observable current = 0;
    @observable onPage = 10;
    @observable page = 0;
    logger = null;

    addLog(cmd, payload = {}) {
        if (this.logger === null)
            this.logger = Store.getInstance().domain.log;

        this.logger.addLog({
            cmd: cmd,
            payload: payload,
        });
    }


    get = (id = null) => {
        if (id === null) {
            const start = this.page * this.onPage;
            return this.rules.slice(start, start + this.onPage);
        }

        return this.rules.find(rule => rule.id === id);
    };
    getCurrent = () => this.current;
    getOnPage = () => this.onPage;
    getPage = () => this.page;

    @action
    async load() {
        const { data } = await api.rules.get();

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
            trigger.settings = btoa(JSON.stringify(trigger.settings));
            return trigger;
        });

        const b64targets = targets.map(target => {
            target.settings = btoa(JSON.stringify(target.settings));
            return target;
        });
        const { data } = await api.rules.post(
            action,
            description,
            b64triggers,
            b64targets,
        );
        this.rules.push(data.rule);

        this.addLog("add_rule", { id: data.rule.id })
    }

    @action
    async edit(id, action, description, triggers = [], targets = []) {
        const b64triggers = triggers.map(trigger => {
            trigger.settings = btoa(JSON.stringify(trigger.settings));
            return trigger;
        });

        const { data } = await api.rules.put(
            id,
            action,
            description,
            b64triggers,
            targets,
        );

        const index = this.rules.findIndex(rule => rule.id === data.rule.id);
        this.rules.splice(index, 1, data.rule);

        this.addLog("edit_rule", { id: id })
    }

    @action
    async setOnPage(onPage) {
        this.onPage = onPage;
        this.setPage(0);
    }

    @action
    async remove(id) {
        await api.rules.remove(id);

        this.rules = this.rules.filter(item => item.id !== id);

        if (this.page * this.onPage >= this.rules.length && this.page > 0)
            this.setPage(this.page - 1);

        this.addLog("remove_rule", { id: id })

    }
}

export default Rules;
