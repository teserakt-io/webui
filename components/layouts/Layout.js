import React from 'react';
import Head from 'next/head';
require("../../styles/main.scss");
require("react-notifications/lib/notifications.css");
import NavigationProvider from "../Navigation/NavigationProvider";
import ModalProvider from "../common/Modal/ModalProvider";
import {NotificationContainer} from "react-notifications";

function Layout(props) {
    return (
        <div>
            <Head>
                <title>Teserakt</title>
            </Head>
            <NavigationProvider/>
            <main>
                {props.children}
            </main>
            <ModalProvider/>
            <NotificationContainer/>
        </div>
    );
}

export default Layout;