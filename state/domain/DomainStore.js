import Clients from './stores/Clients'
import Topics from './stores/Topics'
import Log from './stores/Log'

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
    }
}

export default DomainStore;
