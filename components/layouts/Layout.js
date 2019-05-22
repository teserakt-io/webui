import React from 'react';
import Head from 'next/head';
import "../../styles/main.scss"
import NavigationProvider from "../Navigation/NavigationProvider";

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
        </div>
    );
}

export default Layout;