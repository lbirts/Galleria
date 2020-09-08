import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {NavLink} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import './nav.css';

function Nav(props) {
    return (
        <AppBar position="static" className="appNav">
            <Toolbar className="menu-content" role="navigation">
                <div aria-label="Logo" className="menu-logo">
                    Galleria
                </div>
                <div className="menu-links" role="navigation">
                <NavLink aria-label="Open Gallery" className="menu-link" to="/">
                    Open Gallery
                </NavLink>
                <NavLink aria-label="Profile" className="menu-link" to="/profile">
                    Profile
                </NavLink>
                <NavLink aria-label="Create" className="menu-link" to="/create">
                    <Icon name="cart"/>
                </NavLink>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Nav