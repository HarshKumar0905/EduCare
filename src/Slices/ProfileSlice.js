import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem("existingUser") ? JSON.parse(localStorage.getItem("existingUser")) : null ,
    loading : false
}

const ProfileSlice = createSlice({
    name : 'Profile',
    initialState : initialState,
    reducers : {
        setUser(state, value){
            state.user = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload;
        }
    }
});

export const {setUser, setLoading} = ProfileSlice.actions;
export default ProfileSlice.reducer;