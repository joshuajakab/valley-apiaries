import React, { useState } from 'react';
import Button from '../../../components/forms/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../../redux/Cart/cart.actions'


const Product = (product) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        documentID,
        productThumbnail,
        productName,
        productPrice, 
        secondProductPrice,
        productCategory,
        productDesc
    } = product;
    const [isChecked, setIsChecked] = useState(false)

    if (!documentID || !productThumbnail || !productName || typeof productPrice === 'undefined') return null;

    const configAddToCartButton = {
        type: 'button',
    }

    const handleAddToCart = (product) => {
        if (!product) return;
        
            if (isChecked) {
                dispatch(
                    addProduct({
                        productThumbnail,
                        productName,
                        productDesc,
                        productCategory,
                        secondProductPrice,
                        documentID
                    })
                );
            }
            if (!isChecked) {
                dispatch(
                    addProduct({
                        productThumbnail,
                        productName,
                        productDesc,
                        productCategory,
                        productPrice,
                        documentID
                    })
                );
            }
        
        history.push('/cart');
    }; 

    return (
        <div className='product'>
            <div className='thumb'>
                <Link to={`/product/${documentID}`}>
                    <img src={productThumbnail} alt={productName} />
                </Link>
            </div>

            <div className='details'>
                <ul>
                    <li>
                        <span className='name'>
                            <Link to={`/product/${documentID}`}>
                                {productName}
                            </Link>
                        </span>
                    </li>
                    {productCategory == 'prints' && secondProductPrice &&
                        <li>
                            8.5" x 11" <br />
                            12" x 18": <input name='largePrint' type='checkbox' checked={isChecked} onChange={(event) => setIsChecked(event.currentTarget.checked)} />
                        </li>
                    }
                    {isChecked &&
                        <li>
                            <span>
                                ${secondProductPrice}
                            </span>
                        </li>
                    }
                    {!isChecked &&
                        <li>
                            <span>
                                ${productPrice}
                            </span>
                        </li>
                    }
                    
                    <li>
                        <div className='addToCart'>
                            <Button {...configAddToCartButton} onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </Button>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
};

export default Product;
