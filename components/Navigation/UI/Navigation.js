// @flow
import React, {Component} from 'react';
import images from '../../../utils/images'
import Icon from '../../common/Icon/Icon'
import Link from 'next/link'
// import type { RouteConfig } from '..//routes'

type Props = {
    routes: Array,
    history: Object
}

class Navigation extends Component<Props> {
    navItemHeight = 64;
    navItemOffset = 109.2;

    getIndicatorPosition() {
        const index = this.props.routes.findIndex((route) => route.path === this.props.history.location.pathname)
        return index * this.navItemHeight + this.navItemOffset
    }

    renderLinks() {
        return this.props.routes.map((route) => (
            <Link
                key={route.path}
                // activeClassName="nav--active"
                href={route.path}>
                <a className="nav">
                    <li>
                        {route.iconType === 'fa' && <React.Fragment>
                            {route.icon}
                        </React.Fragment>}
                        {route.iconType !== 'fa' && <React.Fragment>
                            <Icon d={route.icon} viewBoxY={32} viewBoxX={34}/>
                        </React.Fragment>}
                        <span>{route.name}</span>
                    </li>
                </a>
            </Link>
        ))
    }

    render() {
        return (
            <nav className="sidenav">
                <div className="sidenav__logo">
                    <img src={images.logo} alt="Teserakt"/>
                </div>
                <div className="sidenav__nav">
                    <ul>{this.renderLinks()}</ul>
                </div>
                {/*<div style={{ top: this.getIndicatorPosition() }} className="sidenav__indicator"/>*/}
            </nav>
        )
    }
}

export default Navigation