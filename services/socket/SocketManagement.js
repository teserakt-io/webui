// @flow
import Socket from './Socket'
import AppStrings from '../../utils/AppStrings'
import MessageHandler from '../handlers/MessageHandler'
import { NotificationManager } from 'react-notifications'

class SocketManagement {
    socket: Socket
    messageHandler: MessageHandler
    interceptor: Function

    constructor(url: string, messageHandler: MessageHandler) {
        this.messageHandler = messageHandler
        this.socket = new Socket(url)
        this.socket
            .setMessageModifier(this.messageModifier)
            .onMessage(this.processMessage)
            .onClose(this.onConnectionClose)
            .onOpen(this.onConnectionOpen)
            .onError(this.onConnectionError)
    }

    messageModifier(message) {
        return JSON.stringify(message).split('","').join('", "')
    }

    processMessage = (message) => {
        try {
            const data = JSON.parse(message.data)
            this.messageHandler.processMessage(data)
        } catch (e) {
            console.log(AppStrings.ERROR_JSON_PARSE, e)
        }
    }

    onConnectionOpen() {
        NotificationManager.info(AppStrings.SOCKET_CONNECTION_SUCCESS)
    }

    onConnectionClose() {
        console.log(AppStrings.SOCKET_CONNECTION_CLOSED)
    }

    onConnectionError(e) {
        NotificationManager.error(AppStrings.SOCKET_CONNECTION_ERROR)
        console.log(AppStrings.SOCKET_CONNECTION_ERROR, e)
    }

    setInterceptor(fn: Function) {
        this.interceptor = fn
    }

    send(message) {
        try {
            if (this.interceptor) this.interceptor(message)
            this.socket.send(message)
        } catch (e) {
            setTimeout(() => this.send(message), 200)
        }
    }
}

export default SocketManagement