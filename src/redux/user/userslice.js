import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
           state. loading=true
           
        },
        signInsuccess:(state,action)=>{
            state.currentUser=action.payload,
            state.loading=false,
            state.error=null
        },
        signInFail:(state,action)=>{
            state.error=action.payload,
            state.loading=false

        }
    }

})

export const {signInFail,signInStart,signInsuccess}=userSlice.actions;

export default userSlice.reducer;