export const existingCartItem = ({
    prevCartItems,
    nextCartItem,
    
}) => {
    return prevCartItems.find(
        cartItem => ((cartItem.documentID + cartItem.productPrice) === (nextCartItem.documentID + nextCartItem.productPrice)) || ((cartItem.documentID + cartItem.secondProductPrice) === (nextCartItem.documentID + nextCartItem.secondProductPrice))
    )
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantityIncrement = 1;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItem })

    if (cartItemExists) {
        return prevCartItems.map(cartItem =>
            
                ((cartItem.documentID + cartItem.productPrice) === (nextCartItem.documentID + nextCartItem.productPrice)) || ((cartItem.documentID + cartItem.secondProductPrice) === (nextCartItem.documentID + nextCartItem.secondProductPrice))
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity + quantityIncrement
                } : cartItem
        )
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity: quantityIncrement
        }
    ]
};

export const handleRemoveCartItem = ({
    prevCartItems,
    cartItemToRemove
}) => {
    const existingCartItems = prevCartItems.find(cartItem => 
        ((cartItem.documentID + cartItem.productPrice) === (cartItemToRemove.documentID + cartItemToRemove.productPrice)) || ((cartItem.documentID + cartItem.secondProductPrice) === (cartItemToRemove.documentID + cartItemToRemove.secondProductPrice)));
        console.log(existingCartItems)
        return prevCartItems.filter(item => (item.documentID + item.productPrice) !== (existingCartItems.documentID + existingCartItems.productPrice));
    
};

export const handleReduceCartItem = ({
    prevCartItems,
    cartItemToReduce
}) => {
    const existingCartItem = prevCartItems.find(cartItem => 
        ((cartItem.documentID + cartItem.productPrice) === (cartItemToReduce.documentID + cartItemToReduce.productPrice)) || ((cartItem.documentID + cartItem.secondProductPrice) === (cartItemToReduce.documentID + cartItemToReduce.secondProductPrice)));
        console.log(existingCartItem)
        if (existingCartItem.quantity === 1) {
            
            return prevCartItems.filter(
                cartItem => (cartItem.documentID + cartItem.productPrice) !== (existingCartItem.documentID + existingCartItem.productPrice)
            );
        }
        
        return prevCartItems.map(cartItem => 
            
            (cartItem.documentID + cartItem.productPrice) === (existingCartItem.documentID + existingCartItem.productPrice) ?
            {
                ...cartItem,
                quantity: cartItem.quantity - 1
            } : cartItem)
};
