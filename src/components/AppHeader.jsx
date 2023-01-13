import React from 'react'
import { NavLink, withRouter } from "react-router-dom";

function _AppHeader() {
    return (
        <section className='header-cmp'>
            <div>
                Bitcoin App
            </div>
            <nav>
                <NavLink exact to='/' >Home</NavLink>
                <NavLink to='/contact'>Contacts</NavLink>
                <NavLink to='/statistic'>Statistic</NavLink>
            </nav>
        </section>
    )
}

export const AppHeader = withRouter(_AppHeader)
