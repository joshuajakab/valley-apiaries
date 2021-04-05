import React from 'react';
import Button from '../../../components/forms/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions'


const Preview = (product) => {
    
    const {
        documentID,
        productThumbnail,
        productName,
        productPrice
    } = product;

    if (!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null;

    return (
        <div className='preview'>
            <img className="preview-img" src={productThumbnail} alt={productName} />
        </div>
    );
};

export default Preview;

