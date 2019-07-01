import Modal from './stores/Modal'
import Forms from "./stores/Forms/Forms";

class ViewStore {
    rootStore = null;
    modal = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.modal = new Modal();
        this.form = new Forms();
    }
}

export default ViewStore