// @flow
import * as React from 'react';
// import { NavLink } from 'react-router-dom'
import images from '../../../utils/images'
import Icon from '../../common/Icon/Icon'
// import type { RouteConfig } from 'routes'
// import './Navigation.scss';

type Props = {
    // routes: Array<RouteConfig>,
    history: Object
}

class Navigation extends React.Component<Props> {
    navItemHeight = 64;
    navItemOffset = 109.2;

    // getIndicatorPosition() {
    //     const index = this.props.routes.findIndex((route) => route.path === this.props.history.location.pathname)
    //     return index * this.navItemHeight + this.navItemOffset
    // }

    // renderLinks() {
    //     return this.props.routes.map((route) => (
    //         <NavLink
    //             key={route.path}
    //             className="nav"
    //             activeClassName="nav--active"
    //             to={route.path}>
    //             <li>
    //                 <Icon d={route.icon} viewBoxY={32} viewBoxX={34}/>
    //                 <span>{route.name}</span>
    //             </li>
    //         </NavLink>
    //     ))
    // }

    render() {
        return (
            <nav className="sidenav">
                <div className="sidenav__logo">
                    <img src={images.logo} alt="Teserakt"/>
                </div>
                {/*<div className="sidenav__nav">*/}
                {/*    <ul>{this.renderLinks()}</ul>*/}
                {/*</div>*/}
                {/*<div style={{ top: this.getIndicatorPosition() }} className="sidenav__indicator"></div>*/}
            </nav>
        )
    }
}

export default Navigation