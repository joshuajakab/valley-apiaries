import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidedrawer from '../components/Sidedrawer/SideDrawer';
import Backdrop from '../components/Sidedrawer/Backdrop/Backdrop';
import DrawerToggleButton from '../components/Sidedrawer/DrawerToggleButton/drawerToggleButton';
import Welcome from '../components/Welcome';





const WelcomeLayout = props => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    
    console.log({sideDrawerOpen})
    //localStorage.clear()
    


    const toggleSideDrawer = () => {
        setSideDrawerOpen(sideDrawerOpen => !sideDrawerOpen)
    }

    useEffect(() => {
        console.log(sideDrawerOpen)
        
    }, [sideDrawerOpen])

    return (
        <div className='fullHeight'>
            <Welcome />
            <DrawerToggleButton click={toggleSideDrawer}/>
            <Header />
            
            {sideDrawerOpen && [ 
                <div>
                    <Sidedrawer />
                    <Backdrop click={toggleSideDrawer} />
                </div>
            ]}

            
            <div className='main'>
                {props.children}
            </div>
            <div className='spacer'></div>
            <Footer className='footer'/>
        </div>
    );
};

export default WelcomeLayout;