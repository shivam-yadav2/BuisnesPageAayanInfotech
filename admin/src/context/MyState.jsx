import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';

const MyState = ({ children }) => {
    const isTokenExpire = () => {
        const accessToken = Cookies.get('accessTokenAdmin')
        console.log(accessToken)
        if (!accessToken) {
            return true
        }

        try {
            const decoded = jwtDecode(accessToken)
            const currenttime = Date.now() / 1000; // Current time in seconds
            return decoded.exp < currenttime;
        } catch (error) {
            console.error('error decoding token:', error);
            return true;
        }
    }



    const refreshAccessToken = async () => {
        try {
            const Token = Cookies.get('refreshToken')
            let data = JSON.stringify({
                "refreshToken": Token
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:4000/api/v1/admin/refresh-token',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };
            const response = await axios.request(config);
            const accessToken = response.data?.data?.accessToken;
            const refreshToken = response.data?.data?.newRefreshToken;
            console.log(response?.data?.data)
            Cookies.set('accessTokenAdmin', accessToken);
            Cookies.set('refreshToken', refreshToken);
        } catch (error) {
            console.log(error)
        }
    }


    // useEffect(() => {
    //     const val = isTokenExpire()
    //     console.log(val)
    //     if (val) {
    //         refreshAccessToken()
    //     }
    // }, [])

    return (
        <MyContext.Provider
            value={{ refreshAccessToken, isTokenExpire }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyState;
