import { observable, action } from 'mobx'
import api from '../../../api/api';

class Clients {
    @observable clients = [];
    @observable count = 0;
    @observable page = 0;
    @observable onPage = 10;

    getClients = () => this.clients.toJS();
    getCount = () => this.count;
    getPage = () => this.page;

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
        const offset = this.page * this.onPage;
        const count = this.onPage;
        const { data, status } = await api.clients.get(offset, count);

        this.clients = data ? data : [];
    }

    @action
    async changePage(page) {
        this.page = page;
        this.loadClients();
    }

    @action
    async add(name, key) {
        const { data, status } = await api.clients.post(name, key);

        if(status === 200){
            this.clients.push(name);
            this.count++;
        }
    }

    @action
    async deleteClient(name) {
        const {data, status} = await api.clients.delete(name);
        await this.loadClients();

        this.count--;
        if(this.clients.length === 0 && this.page !== 0)
            this.changePage(this.page - 1)
    }
}

export default Clients