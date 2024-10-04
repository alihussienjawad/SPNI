// api.ts

import axios from 'axios';
 
const baseURL= 'http://localhost:5454/api';
const instance = axios.create({
    baseURL,
    headers: {
       //'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

const refreshTokenFun = async (refreshToken: string): Promise<string | null> => {
   
    try {
        const response = await axios.post(`${baseURL}/Account/refresh`, { token: localStorage.getItem('token'), refreshToken });
        const { token} = response.data;

        localStorage.setItem('token', token);
       // SetToken(token);
        return token;

    } catch (error) {
        //alert('Refresh token failed!');

        return null;
    }
};

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refresh_token');
            const token = await refreshTokenFun(refreshToken!);

            if (token) {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                return axios(originalRequest);
            }
            else {
                if (localStorage.getItem("token") !== null) {
                    localStorage.removeItem('token');
                }
                if (localStorage.getItem("refresh_token") !== null) {
                    localStorage.removeItem('refresh_token');
                }
                if (localStorage.getItem("refresh_token_expiry") !== null) {
                    localStorage.removeItem('refresh_token_expiry');
                }
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
