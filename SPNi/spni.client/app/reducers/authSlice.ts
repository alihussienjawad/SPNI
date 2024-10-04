import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAuth, ILoginResponse, LoginDto } from '../../src/Interfaces/GeneralInterface';
import axios from '../../src/api';
import { RootState } from '../store';
 
 
 
const initialState: IAuth = {
    loginResponse : {
    token: "",
    expiration: new Date,
    refresh_token: "",
    refresh_token_expiry: new Date,
    message: "",
        loginStatus: false,
    passwordChange:false,
    userRoles: [],
    basicUserInfo: {
    userName:""
                   } },    
    loading: false,  
    messegeError:""
}
                                      ////////// account 
            
export const LoginAsync = createAsyncThunk<ILoginResponse, LoginDto>('auth/LoginAsync', async (user) => {

 
    const res = await axios.post(`/Account/login`, user)
         
 
    return res.data;
})


export const logout = createAsyncThunk<boolean,void>('auth/logout', async () => {
    try {
        const res1 = await axios.post(`/Account/logout`)
        return res1.data;

    } catch {
        return
    }
    
    
})
 
export const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers: {
        
        NotLogin: (state) => {
            state.loginResponse = {} as ILoginResponse;
            
        }
    },


 extraReducers: (builder)=>{
     builder                                               ////////login //////////////////////
         .addCase(LoginAsync.pending, (state) => {
             state.loading = true
             
         })
 
    .addCase(LoginAsync.rejected, (state) => {
        state.loading=false
 
         })
 
    .addCase(LoginAsync.fulfilled, (state,action) => {
        state.loading = false
        state.loginResponse = action.payload
         
    })
                                                                 ////////logout///////////////////
  
         .addCase(logout.pending, (state) => {
             state.loading = true
         })

         .addCase(logout.rejected, (state) => {
             state.loading = false
           state.messegeError = "حدث خطأ"
         })

         .addCase(logout.fulfilled, (state) => {
             state.loading = false
             state.loginResponse = {} as ILoginResponse
             state.messegeError = " تم تسجيل الخروج بنجاح"

         })
     
 }
})
 
 
export const { NotLogin  } = authSlice.actions
export const authState = (state: RootState) => state.auth;
export default authSlice.reducer


 