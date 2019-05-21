import React from 'react';
import Head from 'next/head'
// import styled from '../../styles/main.scss'
import NavigationProvider from "../Navigation/NavigationProvider";

function Layout(props) {
    return (
        <div>
            <Head>
                {/*<style>{styled}</style>*/}
                <title>Teserakt</title>
            </Head>
            <NavigationProvider/>
            {props.children}
        </div>
    );
}

export default Layout;