import React from 'react';
import axios from '../axiosconfig/';

const Auth = {
     userSignIn: (email, password) => {
        return new Promise((resolve, reject) => {
            let data = JSON.stringify({
                "username": email,
                "password": password
            });
            let config = {
                method: 'post',
                url: '/mlogin',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }
}
export default Auth;