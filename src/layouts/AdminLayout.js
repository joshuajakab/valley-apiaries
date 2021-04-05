import React, {  useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from '../redux/User/user.actions';

import Header from '../components/Header';
import VerticalNav from '../components/VerticalNav';
import Footer from '../components/Footer';
import DrawerToggleButton from '../components/Sidedrawer/DrawerToggleButton/drawerToggleButton';
import Sidedrawer from '../components/Sidedrawer/SideDrawer';
import Backdrop from '../components/Sidedrawer/Backdrop/Backdrop';

const AdminLayout = props => {
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);


    const toggleSideDrawer = () => {
        setSideDrawerOpen(sideDrawerOpen => !sideDrawerOpen)
    }

    useEffect(() => {
        console.log(sideDrawerOpen)
        
    }, [sideDrawerOpen])

    return (
        <div className="adminLayout">
            <DrawerToggleButton click={toggleSideDrawer}/>
            <Header {...props} />

            {sideDrawerOpen && [ 
                <div>
                    <Sidedrawer />
                    <Backdrop click={toggleSideDrawer} />
                </div>
            ]}

            <div className='controlPanel' >
                <div className='sidebar'>
                    <VerticalNav>
                        <ul>
                            <li>
                                <Link to='/admin'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <span className='signOut' onClick={() => signOut()}>
                                    Sign Out
                                </span>
                            </li>
                        </ul>
                    </VerticalNav>
                </div>
                <div className='content'>
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminLayout;
