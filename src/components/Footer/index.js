import React from 'react';

import Facebook from '../../assets/facebook.svg';
import Instagram from '../../assets/instagram.svg';
import './styles.scss';

const Footer = props => {
    return (
        <footer className='footer'>
            <div className='wrap'>
                <a href='https://www.facebook.com/caitlingatesartwork'>
                    <img src={Facebook} alt='facebook'></img>
                </a>
                <a href='https://www.instagram.com/caitlingatesartwork/'>
                    <img src={Instagram} alt='facebook'></img>
                </a>
            </div>

        </footer>
    );
};

export default Footer
