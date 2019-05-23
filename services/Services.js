import * as React from 'react'
import SocketManagement from './socket/SocketManagement'
import MessageHandler from './handlers/MessageHandler'
import CommandHandler from './handlers/CommandHandler'
import { Store } from '../state/Store'
import Service from './Services'
import config from '../config/index'

const store = Store.getInstance()
const messageHandler = new MessageHandler(store.domain)
const socketManagement = new SocketManagement(config.wsUrl, messageHandler)
const commandHandler = new CommandHandler(socketManagement, store.domain)
socketManagement.setInterceptor((data) => {
    store.domain.log.addLog({
        date: Date.now(),
        cmd: data.CmdType,
        payload: data
    })
})

class Services {
    static type = {
        MESSAGE_HANDLER: 'MESSAGE_HANDLER',
        COMMAND_HANDLER: 'COMMAND_HANDLER'
    }

    static inject = (services) => (Component) => {
        const servicesToInject = {}
        services.forEach((service) => {
            switch (service) {
                case Service.type.MESSAGE_HANDLER:
                    servicesToInject.messageHandler = messageHandler
                    break
                case Service.type.COMMAND_HANDLER:
                    servicesToInject.commandHandler = commandHandler
                    break
            }
        })

        class EnhancedComponent extends React.Component {
            render() {
                return <Component services={servicesToInject} {...this.props}/>
            }
        }

        return Object.assign(EnhancedComponent, Component)
    }
}

export default Services