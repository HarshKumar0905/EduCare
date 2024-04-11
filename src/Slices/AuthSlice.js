import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    token : localStorage.getItem('token') ? 
    JSON.parse(localStorage.getItem('token')) : null,
    loading : false
}

const AuthSlice = createSlice({
    name : 'Auth',
    initialState : initialState,
    reducers : {
        setSignupData: (state,value) =>{
            state.signupData = value.payload;
        },
        setToken(state, value){
            state.token = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    }
});

export const {setSignupData, setLoading, setToken} = AuthSlice.actions;
export default AuthSlice.reducer;