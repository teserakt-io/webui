import { observable, action } from 'mobx'
import api from '../../../api/api';

class Clients {
    @observable clients = [];
    @observable count = 0;

    getClients = () => this.clients.toJS();
    getCount = () => this.count;

    @action
    async loadCount() {
        const {data} = await api.clients.count();

        this.count = data;
    }
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

        if(status === 200)
            this.clients.push(name);
    }

    @action
    async deleteClient(name) {
        const {data, status} = await api.clients.delete(name);
        this.clients = this.clients.filter(item => item !== name);
    }
}

export default Clients