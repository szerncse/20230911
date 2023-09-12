import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState : "홍길동",
    reducers : {
     changName() {
        return "테스트" 
     }
    }
})

let dark = createSlice({
    name : "dark",
    initialState : "light",
    reducers : {
        toggleTheme : (state) => state === "light" ? "dark" : "light"
    }
})


export const {changName} = user.actions;
export const {toggleTheme} = dark.actions;

export default configureStore({
    reducer :{
        user : user.reducer,
        dark : dark.reducer
    }
})
