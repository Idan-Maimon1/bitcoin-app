import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom";

class _AppHeader extends Component {

    state = {
        navRoutes: ['home', 'contact', 'statistic', 'gamble']
    }

    render() {
        const { navRoutes } = this.state
        return (
            <section className='header-cmp'  >
                <div className='logo-cont'>
                    <span className='nav-icon'>&#x2630;</span>
                    <div>
                        Bitcoin<span className='blue-color'>A</span>pp
                    </div>
                </div>
                <nav>
                    {navRoutes.map(routeName =>
                        <NavLink className='nav-link' exact to={'/' + (routeName === 'home' ? '' : routeName)} key={routeName}>{routeName === 'contact' ? 'contacts' : routeName}</NavLink>
                    )}
                </nav>
            </section>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)
