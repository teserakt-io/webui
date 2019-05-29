import { observable, action } from 'mobx'
import api from '../../../api/api';

class Clients {
    @observable clients = [];

    getClients = () => this.clients;
    countClients = () => this.clients.length;

    @action
    addClients(clients) {
        this.clients = clients
    }

    @action
    async loadClients() {
        const { data, status } = await api.clients.get();

        this.clients = data ? data : [];
    }

    @action
    async add(name, key) {
        const { data, status } = await api.clients.post(name, key);
        console.log("add client: ", data, status);


    }

    @action
    async deleteClient(name) {
        const {data, status} = await api.clients.delete(name);
        console.log(status);

        this.clients = this.clients.filter(item => item !== name);
    }
}

export default Clients