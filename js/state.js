const state = {
    totalProducts: [],
    cart: JSON.parse(localStorage.getItem("cart")) || [] 
};

// Function to update state and store it in localStorage
function updateState(newState) {
    console.log(newState);
    
    Object.assign(state, newState);
    localStorage.setItem("cart", JSON.stringify(state.cart)); 
}

// Function to add product to cart
function addToCart(productId) {
    let product = state.totalProducts.find(p => p.id === productId);
    
    if (product) {
        let isAlreadyInCart = state.cart.some(item => item.id === productId);
        
        if (!isAlreadyInCart) {
            state.cart.push(product);
            updateState({ cart: state.cart });
            updateCartCount();
            console.log("Cart Updated:", state.cart);
        } else {
            alert("Product already in cart!");
        }
    }
}

// Function to update the cart count in UI
function updateCartCount() {
    $("#cartCount").text(state.cart.length);
}

// Load cart count on page load
$(document).ready(function () {
    updateCartCount();
});
