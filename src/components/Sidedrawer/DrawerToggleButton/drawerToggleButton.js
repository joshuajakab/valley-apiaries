import React from 'react';
import './styles.scss';
import MenuIcon from '../../../assets/menu-icon.svg';

const DrawerToggleButton = props => (
    <button className="toggle-button" onClick={props.click} >
        <img src={MenuIcon} alt='menu' />
    </button>
);

export default DrawerToggleButton;