import App from 'next/app';
import Head from 'next/head';
import * as React from 'react';
import { NotificationContainer } from "react-notifications";
import ModalProvider from "../components/common/Modal/ModalProvider";
import NavigationProvider from "../components/Navigation/NavigationProvider";

require("../styles/main.scss");
require("react-notifications/lib/notifications.css");
require("font-awesome/css/font-awesome.min.css");


class CustomApp extends App {
    static async getInitialProps(appContext) {
        const appProps = await App.getInitialProps(appContext);
        return { ...appProps }
    }

    render() {
        const { Component, pageProps } = this.props
        return <React.Fragment>
            <Head>
                <title>Teserakt</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
            </Head>
            <NavigationProvider />
            <main>
                <Component {...pageProps} />
            </main>
            <ModalProvider />
            <NotificationContainer />
        </React.Fragment>
    }
}

export default CustomApp
