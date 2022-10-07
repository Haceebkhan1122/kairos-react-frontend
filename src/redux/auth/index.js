import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users:[],
    authenticated:false,
};
const appReducer = createSlice({
    name: "app",
    initialState:initialState,
    reducers: {
        setUserData: (state = 0, action) => {
            state.users.push(action.payload.user);
        },
        loginUser: (state = 0, action) => {
            // console.log(JSON.stringify(action.payload));
            // state.users.map((u)=>{
            //     // console.log(u.email);
            //     if(u.email == action.payload.email && u.password == action.payload.password){
            //         state.authenticated = true;
            //         console.log('true');
            //     }
            // })

            const user = state.users.find(u => u.email === action.payload.email && u.password == action.payload.password)
            if(user){
                state.authenticated = true;
            } else{
                state.authenticated = false;
            }
        },
    },
});

export const { setUserData } = appReducer.actions;
export const { loginUser } = appReducer.actions;
export const getUsers = (state) => state.app.users;
export const getLogin = (state) => state.app.authenticated;

export default appReducer.reducer;
