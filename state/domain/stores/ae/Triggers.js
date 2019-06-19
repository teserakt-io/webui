import {observable} from "mobx";

class Triggers {
    @observable triggers = [];

    get = () => this.triggers;
}

export default Triggers;