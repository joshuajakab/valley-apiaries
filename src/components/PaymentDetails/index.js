import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from '../../Utils';
import { selectCartTotal, selectCartItemsCount } from '../../redux/Cart/cart.selectors';
import { clearCart } from '../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import Square from '../Square';
import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
} from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import './styles.scss'

const initialAddressState = {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone: '',
    email: ''
}

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount
});

const initialPaymentState = { errorMessages: [] }

const PaymentDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { total, itemCount } = useSelector(mapState);
    const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
    const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
    const [recipientName, setRecipientName] = useState('');
    const [firstNameOnCard, setFirstNameOnCard] = useState('');
    const [lastNameOnCard, setLastNameOnCard] = useState('')
    const [isLoad, setLoad] = useState(false);
    const [errorMessages, setErrorMessages] = useState(initialPaymentState)

    const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
        if (errors) {
            setErrorMessages({ errorMessages: errors.map(error => error.message) })
            return
        }

        setErrorMessages({ errorMessages: [] })
        alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
        apiInstance.post('/process-payment', { nonce: nonce, token: buyerVerificationToken })
        console.log({ nonce, buyerVerificationToken })
        console.log(process.env.REACT_APP_APPLICATION_ID)
        dispatch(
            clearCart()
        )
    }

    const createVerificationDetails = () => {
        return {
            amount: total,
            currencyCode: "USD",
            intent: "CHARGE",
            billingContact: {
                familyName: billingAddress.lastNameOnCard,
                givenName: billingAddress.firstNameOnCard,
                email: billingAddress.email,
                country: billingAddress.country,
                city: billingAddress.city,
                addressLines: [billingAddress.line1, billingAddress.line2],
                postalCode: billingAddress.postalCode,
                phone: billingAddress.phone
            }
        }
    }

    //useEffect(() => {
    //    let sqPaymentScript = document.createElement("script");
    //    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    //    // production: https://js.squareup.com/v2/paymentform
    //    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    //    sqPaymentScript.type = "text/javascript";
    //    sqPaymentScript.async = false;
    //    sqPaymentScript.onload = () => {
    //      setLoad(true);
    //    };
    //    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    //  });
    //
    //  const squarePayment = isLoad ? (
    //        <Square paymentForm={ window.SqPaymentForm }/>
    //    ) : (
    //       null
    //    )


    useEffect(() => {
        if (itemCount < 1) {
            history.push('/')
        }

    }, [itemCount])

    const handleShipping = evt => {
        const { name, value } = evt.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    };

    const handleBilling = evt => {
        const { name, value } = evt.target;
        setBillingAddress({
            ...billingAddress,
            [name]: value
        });
    };

    const handleFormSubmit = async evt => {
        evt.preventDefault();

        if (
            !shippingAddress.line1 || !shippingAddress.city ||
            !shippingAddress.state || !shippingAddress.zip_code ||
            !shippingAddress.country || billingAddress.line1 ||
            !billingAddress.city || !billingAddress.state ||
            !billingAddress.zip_code || !billingAddress.country ||
            !recipientName || !firstNameOnCard ||
            !lastNameOnCard || !billingAddress.email ||
            !billingAddress.phone
        ) {
            return;
        }

    };

    return (
        <div className='paymentDetails'>
            <form onSubmit={handleFormSubmit}>

                <div className='group'>
                    <h2>
                        Shipping Address
                    </h2>

                    <FormInput
                        required
                        type='text'
                        name='recipientName'
                        handleChange={evt => setRecipientName(evt.target.value)}
                        placeholder='Recipient Name'
                        value={recipientName}
                    />

                    <FormInput
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Line 1'
                        value={shippingAddress.line1}
                    />

                    <FormInput
                        type='text'
                        name='line2'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Line 2'
                        value={shippingAddress.line2}
                    />

                    <FormInput
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='City'
                        value={shippingAddress.city}
                    />

                    <FormInput
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='State'
                        value={shippingAddress.state}
                    />

                    <FormInput
                        required
                        type='text'
                        name='zip_code'
                        handleChange={evt => handleShipping(evt)}
                        placeholder='Zip Code'
                        value={shippingAddress.zip_code}
                    />

                    <div className='formRow checkoutInput'>

                        <CountryDropdown
                            required
                            onChange={val => handleShipping({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            valueType='short'
                            value={shippingAddress.country}
                        />

                    </div>

                </div>

                <div className='group'>
                    <h2>
                        Billing Address
                    </h2>

                    <FormInput
                        required
                        type='text'
                        name='firstNameOnCard'
                        handleChange={evt => setFirstNameOnCard(evt.target.value)}
                        placeholder='First Name'
                        value={firstNameOnCard}
                    />

                    <FormInput
                        required
                        type='text'
                        name='lastNameOnCard'
                        handleChange={evt => setLastNameOnCard(evt.target.value)}
                        placeholder='Last Name'
                        value={lastNameOnCard}
                    />

                    <FormInput
                        required
                        type='text'
                        name='line1'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Line 1'
                        value={billingAddress.line1}
                    />

                    <FormInput
                        type='text'
                        name='line2'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Line 2'
                        value={billingAddress.line2}
                    />

                    <FormInput
                        required
                        type='text'
                        name='city'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='City'
                        value={billingAddress.city}
                    />

                    <FormInput
                        required
                        type='text'
                        name='state'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='State'
                        value={billingAddress.state}
                    />

                    <FormInput
                        required
                        type='text'
                        name='zip_code'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Zip Code'
                        value={billingAddress.zip_code}
                    />

                    <div className='formRow checkoutInput'>

                        <CountryDropdown
                            required
                            onChange={val => handleBilling({
                                target: {
                                    name: 'country',
                                    value: val
                                }
                            })}
                            value={billingAddress.country}
                            valueType='short'
                        />

                    </div>

                    <FormInput
                        required
                        type='tel'
                        name='phone'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Phone Number'
                        value={billingAddress.phone}
                    />

                    <FormInput
                        required
                        type='email'
                        name='email'
                        handleChange={evt => handleBilling(evt)}
                        placeholder='Email Address'
                        value={billingAddress.email}
                    />

                </div>

                <div className='group'>
                    <h2>
                        Card Details
                    </h2>
                </div>
                <SquarePaymentForm
                    className='square-form'
                    sandbox={true}
                    applicationId={process.env.REACT_APP_APPLICATION_ID}
                    locationId={process.env.REACT_APP_LOCATION_ID}
                    cardNonceResponseReceived={cardNonceResponseReceived}
                    createVerificationDetails={createVerificationDetails}
                >
                    <fieldset className="sq-fieldset">
                        <CreditCardNumberInput />
                        <div className="sq-form-third">
                            <CreditCardExpirationDateInput />
                        </div>

                        <div className="sq-form-third">
                            <CreditCardPostalCodeInput />
                        </div>

                        <div className="sq-form-third">
                            <CreditCardCVVInput />
                        </div>
                    </fieldset>

                    <CreditCardSubmitButton>
                        Pay {total}
                    </CreditCardSubmitButton>
                </SquarePaymentForm>



            </form>
            <div className='spacer'></div>
        </div>
    );
}

export default PaymentDetails;
