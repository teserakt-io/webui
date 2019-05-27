import React from 'react';
import Head from 'next/head';
import "../../styles/main.scss"
import NavigationProvider from "../Navigation/NavigationProvider";
import ModalProvider from "../common/Modal/ModalProvider";
import {NotificationContainer} from "react-notifications";
import Overlay from "../Overlay/Overlay";

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