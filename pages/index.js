import {Component} from 'react';
import Router from 'next/router';

class Home extends Component {
    static async getInitialProps(ctx) {
        let homepage = '/dashboard';
        if (ctx && ctx.req) {
            ctx.res.writeHead(302, {Location: homepage})
            ctx.res.end()
        } else {
            Router.push(homepage)
        }
    }
}

export default Home;