import { observable, action } from 'mobx'

class Modal {
    @observable isActive: boolean = false
    @observable modalType: String
    @observable modalProps: any

    isModalActive = () => this.isActive

    get modalType() {
        return this.modalType
    }

    get modalProps() {
        return this.modalProps
    }

    @action
    hide = () => {
        this.isActive = false
    }

    @action
    open = (modalType: String, modalProps: any = {}) => {
        this.isActive = true
        this.modalType = modalType
        this.modalProps = modalProps
    }
}

export default Modal