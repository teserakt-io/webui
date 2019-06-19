import {observable} from "mobx";

class Rules {
    @observable rules = [
        {
            type: "TYPE",
            description: "Description",
            last: new Date().toISOString(),
            triggers: 5,
            targets: 3,
        }
    ];

    get = () => this.rules;
}

export default Rules;