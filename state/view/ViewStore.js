import Modal from './stores/Modal'

class ViewStore {
    rootStore = null
    modal = null

    constructor(rootStore) {
        this.rootStore = rootStore
        this.modal = new Modal()
    }
}

export default ViewStore