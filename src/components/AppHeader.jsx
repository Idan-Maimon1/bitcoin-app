import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";

class _AppHeader extends Component {

    state = {
        isNavOn: false,
        navRoutes: ['home', 'contact', 'statistic']
    }
    onChangeNav = (boolen) => {
        this.setState({ isNavOn: boolen })
    }
    render() {
        const { isNavOn, navRoutes } = this.state
        return (
            <section onMouseOver={() => this.onChangeNav(true)} onMouseLeave={() => this.onChangeNav(false)} className='header-cmp'>
                <div className='logo-cont'>
                    <span className='nav-icon'>&#x2630;</span>
                    <div>
                        Bitcoin<span className='blue-color'>A</span>pp
                    </div>
                </div>
                {isNavOn &&
                    <nav>
                        {navRoutes.map(routeName =>
                            <NavLink className='nav-link' exact to={'/' + (routeName === 'home' ? '' : routeName)} key={routeName}>{routeName}</NavLink>
                        )}
                    </nav>
                }
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)
