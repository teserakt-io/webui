import { observable, action } from 'mobx'

class Clients {
    @observable clients = [];

    getClients = () => this.clients;
    countClients = () => this.clients.length;

    @action
    addClients(clients) {
        this.clients = clients
    }
}

export default Clients