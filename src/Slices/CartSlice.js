import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem('totalItems') ?
    JSON.parse(localStorage.getItem('totalItems')) : 0,
    cart: localStorage.getItem("cart") ? 
    JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total") ? 
    JSON.parse(localStorage.getItem("total")):0
}

const CartSlice = createSlice({
    name : 'Cart',
    initialState : initialState,
    reducers : {
        addtoCart(state, action){
            const course = action.payload;
            const index = state.cart.findIndex((item)=> item._id === course._id)

            if(index>=0){
                toast.error("Course present in cart");
                return
            }

            state.cart.push(course);
            state.totalItems++;
            state.total += JSON.parse(course.price);

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            toast.success("Course added to cart");
        },
        removeFromCart(state, action){
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)
      
            if (index >= 0) {
              state.totalItems--;
              state.total -= state.cart[index].price;
              state.cart.splice(index, 1);
              
              localStorage.setItem("cart", JSON.stringify(state.cart))
              localStorage.setItem("total", JSON.stringify(state.total))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
              toast.success("Course removed from cart")
            }
        },
        resetCart(state){
            state.cart = []
            state.total = 0
            state.totalItems = 0
            // Update to localstorage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
            toast.success("Your cart has been reset");
        }
    }
});

export const {addtoCart, removeFromCart, resetCart} = CartSlice.actions;
export default CartSlice.reducer;