import React from 'react';
import Logo from '../../assets/logo.svg';
import './styles.scss';

const Welcome = props => {

    return (
        <div className='welcome'>
            <img src={Logo} alt='logo' className='logo'/>
            <div className='scroll'>scroll to enter</div>
        </div>
    )
};

export default Welcome;
