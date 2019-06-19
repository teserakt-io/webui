import Clients from './stores/Clients'
import Topics from './stores/Topics'
import Log from './stores/Log'
import AE from "./stores/ae/AE";

class DomainStore {
    rootStore = null;
    clients = null;
    topics = null;
    log = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.clients = new Clients();
        this.topics = new Topics();
        this.log = new Log();
        this.ae = new AE();
    }
}

export default DomainStore;
