import React, { useState } from 'react';
import './styles.scss'

const Modal = ({ hideModal, toggleModal, children }) => {
    if (hideModal) return null;

    return [
        <div className='modalOverlay' >
            <div className='modalWrap'>
                <div className='modal'>
                    {children}
                </div>
            </div>
        </div>
    ];
}

export default Modal;
