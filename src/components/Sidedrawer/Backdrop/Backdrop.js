import React from 'react';
import './styles.scss'



const backdrop = props => (
    <div className='backdrop' onClick={props.click}/>
);

export default backdrop;