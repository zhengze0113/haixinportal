import axios from 'axios';
import {
    Message,
    MessageBox
} from 'element-ui';
import store from '../store';
import {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getExpiresIn,
    setExpiresIn,
    removeExpiresIn,
    getRefreshExpiresIn,
    setRefreshExpiresIn,
    removeRefreshExpiresIn,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    getLoginDate,
    setLoginDate,
    removeLoginDate,
    getLoadAccessTokenDate,
    setLoadAccessTokenDate,
    removeLoadAccessTokenDate,
    setLocation,
    removeLocation,
    setUserLocation,
    removeUserLocation,
    getUserInfo,
    setUserInfo,
    removeUserInfo,
    getUserName,
    setUserName,
    removeUserName,
    getLastUserName,
    setLastUserName,
    removeLastUserName,
    removeUrl
} from '@/utils/auth';
import { getUser } from '../api/user';
import baseURL from "@/api/app.js";
// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器

service.interceptors.request.use(

    config => {
        if (getAccessToken() != undefined) {
            if ((config.url.search('/cms/') != -1) == false && (config.url.search('/api/cloud/iams/refresh') != -1) == false) {
                const nowDate = new Date().getTime() / 1000;
                if (nowDate - getLoginDate() < getRefreshExpiresIn() - 100) {
                    if (nowDate - getLoadAccessTokenDate() < getExpiresIn() - 100) {
                        config.headers['Authorization'] = 'Bearer ' + getAccessToken();
                        // 让每个请求携带自定义token 请根据实际情况自行修改
                    } else {
                        store
                            .dispatch('refreshToken').then(
                                config.headers['Authorization'] = 'Bearer ' + getAccessToken());
                        // 让每个请求携带自定义token 请根据实际情况自行修改
                    }
                } else {
                    removeAccessToken();
                    removeExpiresIn();
                    removeRefreshExpiresIn();
                    removeRefreshToken();
                    removeLoginDate();
                    removeLoadAccessTokenDate();
                    removeUserInfo();
                    setLastUserName(getUserName());
                    removeUserName();
                    removeUrl();
                    setLocation(location.href);
                    setUserLocation(location.origin + '/#/userCentre/userShoppingCart');
                    if (location.pathname != '/html/login.html') {
                        location.href = baseURL.portalPath + '/html/login.html';
                    }
                }
                // config.headers['X-Token'] = getAccessToken();
                // // 让每个请求携带自定义token 请根据实际情况自行修改
            }
        } else if (location.pathname != '/html/login.html') {
            setLastUserName(getUserName());
            removeUserName();
            removeUrl();
            setLocation(location.href);
            setUserLocation(location.origin + '/#/userCentre/userShoppingCart');
            location.href = baseURL.portalPath + '/html/login.html';
        }
        if (config.method.toLocaleLowerCase() === 'get' || config.method.toLocaleLowerCase() === 'delete') {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        } else if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put') {
            config.headers['Content-Type'] = 'application/json';
        } else if (config.method.toLocaleLowerCase() === 'batchdelete') {
            config.method = 'delete';
        }

        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// response 拦截器
service.interceptors.response.use(

    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        const url = response.config.url;
        if (/^\/cms/.test(url)) { // 匹配cms出错
            return res;
        } else if (!/^20\d{1}$/.test(res.code)) {
            Message({
                center: true,
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });

            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm(
                    '你已被登出，可以取消继续留在该页面，或者重新登录',
                    '确定登出', {
                        confirmButtonText: '重新登录',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload(); // 为了重新实例化vue-router对象 避免bug
                    });
                });
            }
            return Promise.reject('error');
        } else {
            return response.data;
        }
    },
    error => {
        const code = error.message.replace(/[^0-9]/ig, '');
        switch (code) {
            case '400':

                error.message = '错误请求';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '401':


                window.location.reload();
                break;

            case '403':

                error.message = '拒绝访问';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '404':

                error.message = '请求错误,未找到该资源';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '405':

                error.message = '请求方法未允许';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '408':

                error.message = '请求超时';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '500':

                error.message = '服务器端出错';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '501':

                error.message = '网络未实现';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });
                break;

            case '502':

                error.message = '网络错误';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '503':

                error.message = '服务不可用';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });
                break;

            case '504':

                error.message = '网络超时';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            case '505':

                error.message = 'http版本不支持该请求';
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });

                break;

            default:

                error.message = `请求超时`;
                Message({
                    center: true,
                    message: error.message,
                    type: 'error',
                    duration: 5 * 1000
                });
                return Promise.reject(error);
        }
    }
);

export default service;