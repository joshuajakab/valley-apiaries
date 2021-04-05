import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions'
import './styles.scss';
import { Link } from 'react-router-dom';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import Cart from '../../assets/cart.svg'



const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state),

});





const Header = () => {
//    const dispatch = useDispatch();
//    
    const { currentUser, totalNumCartItems } = useSelector(mapState);
//    
//
//    const signOut = () => {
//        dispatch(signOutUserStart());
//    }

    

    

    return (
        
        <header className='header'>
            <div className="wrap"> 
                <nav>
                    <ul>
                        <li>
                            <Link to='/' className='title'>
                                Valley Apiaries
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className='callToActions'>
                <ul>
                <li>
                <Link to='/cart'>
                    <img src={Cart} alt='cart' />({totalNumCartItems})
            </Link>
            </li>
            </ul>
            </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};


export default Header;