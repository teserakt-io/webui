import {observable} from "mobx";

class Targets {
    @observable targets = [];

    get = () => this.targets;
}

export default Targets;