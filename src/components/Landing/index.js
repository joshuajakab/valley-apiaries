import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchProductsStart, setProduct } from '../../redux/Products/products.actions';

import Welcome from '../Welcome';
import Sidedrawer from '../Sidedrawer/SideDrawer';
import Backdrop from '../Sidedrawer/Backdrop/Backdrop';
import Preview from './Preview';
import LoadMore from '../../components/LoadMore';
import './styles.scss'



const mapState = ({ productsData }) => ({
    products: productsData.products
});


const Landing = ({ }) => {

    ;
    const dispatch = useDispatch();
    const history = useHistory();
    const { filterType } = useParams();
    const { products } = useSelector(mapState);

    const { data, queryDoc, isLastPage } = products;

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType })
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/search/${nextFilter}`)
    };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                startAfterDoc: queryDoc,
                persistProducts: data
            })
        );
    };
    
    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    };



    return (
        <div className='directory'>
            <div className='wrap'>
                
                <div className='description'>
                    Valley Apiaries is a local backyard beekeeper providing local raw honey and beekeeping services. Hives located in Locust Valley and Lindenhurst NY.
                </div>

                <img src='https://drive.google.com/uc?id=1iWbCdtrA6Mk3Hi_yLNzd58pjd9rBLUfa' alt='sunflower' className='background-img'/>


            </div>
            
        </div>
    );
};

export default Landing;
