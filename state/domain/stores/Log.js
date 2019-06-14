// @flow
import { observable, action } from 'mobx'

export type LogType = {
    date: number,
    cmd: string,
    payload: Object
}

class Log {
    @observable logs: Array<LogType> = [];

    getLogs = () => this.logs;

    @action
    addLog(log: LogType) {
        if(!log.date)
            log.date = new Date();
        this.logs.unshift(log)
    }
}

export default Log