// @flow
class Socket {
    url: string
    socket: WebSocket
    messageModifier: Function

    constructor(url) {
        this.url = url
        this.connect()
    }

    connect() {
        this.socket = new WebSocket(this.url)
    }

    onMessage(callback: Function) {
        this.socket.onmessage = callback
        return this
    }

    onOpen(callback: Function) {
        this.socket.onopen = callback
        return this
    }

    onClose(callback: Function) {
        this.socket.onclose = callback
        return this
    }

    onError(callback: Function) {
        this.socket.onerror = callback
        return this
    }

    setMessageModifier(modifier: Function) {
        this.messageModifier = modifier
        return this
    }

    send(message) {
        const msg = this.messageModifier ? this.messageModifier(message) : message
        this.socket.send(msg)
    }
}

export default Socket