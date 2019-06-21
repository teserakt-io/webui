import React, { Component } from 'react'
import ViewStore from './view/ViewStore'
import DomainStore from './domain/DomainStore'

let store = null;

class Store {
    view = null;
    domain = null;

    constructor() {
        this.view = new ViewStore(this);
        this.domain = new DomainStore(this);
    }

    static getInstance(): Store {
        if (!store) store = new Store();
        return store
    }

    static inject = (Component) => {
        if (!store) store = new Store();

        class EnhancedComponent extends React.Component {
            render() {
            return <Component store={store} {...this.props}/>
        }
    }

        return Object.assign(EnhancedComponent, Component)
    }
}

export { Store }
