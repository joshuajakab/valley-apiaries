import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount } from '../../../redux/Cart/cart.selectors';
import { signOutUserStart } from '../../../redux/User/user.actions';
import AdminToolbar from '../../AdminToolbar';

import './styles.scss'

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state),

});

const Sidedrawer = () => {
    const dispatch = useDispatch();
    
    const { currentUser, totalNumCartItems } = useSelector(mapState);
    

    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (

    <div>

    <nav className="side-drawer">
        <ul>
            <li><a href="/">Home</a></li>
           
            <li><a href="/search">Store</a> </li>
            <li><AdminToolbar /></li>
            {currentUser && [

<li>
    <Link to='/dashboard'>
        My Account
            </Link>
</li>,
<li>
    <Link onClick={() => signOut()}>
        LogOut
            </Link>
</li>

]}

{!currentUser && [

<li>
    <Link to='/registration'>
        Register
        </Link>
</li>,
<li>
    <Link to='/login'>
        Login
            </Link>
</li>

]}
        </ul>
        
    </nav>
            
            
            
            </div>
                    
                
    )     
    
};

export default Sidedrawer;