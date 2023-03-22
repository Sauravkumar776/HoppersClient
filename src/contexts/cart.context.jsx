import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  //find if cartitem contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //return new array with modified cartItems / new Cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};


export const removeCartItem = (cartItems,cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //if found, check if quantity is equal to 1, if it is remove that from the cart
  
  if(existingCartItem.quantity ===1){
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)

  }
  
  // return back cartItem with matching cart with reduced quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }


}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decrementItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0);
    setCartItemCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

    const removeItemFromCart = (product) =>
    setCartItems(removeCartItem(cartItems,product))

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart,removeItemFromCart, cartItemCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
