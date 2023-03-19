import Vue from 'vue'
import axios from "axios/index";
import NProgress from 'nprogress'
import config from '@/config/config.default'

axios.defaults.baseURL=config.host;

axios.defaults.withCredentials = true;

axios.defaults.xsrfHeaderName = 'x-csrf-token';

axios.defaults.xsrfCookieName = 'csrfToken';

axios.interceptors.request.use((config) => {

    NProgress.start();

    const ACCESS_TOKEN=Vue.prototype.$cookies?Vue.$cookies.get('ACCESS_TOKEN'):Vue.ls.get('ACCESS_TOKEN', undefined)
    if(ACCESS_TOKEN){
        if(!config.params){
            config.params={};
        }
        switch (config.method) {
            case "get"||'GET':
                config.params['access_token']=ACCESS_TOKEN;
                break;
            default:
                break;
        }
    }
    const LOGIN_USER=Vue.prototype.$cookies?Vue.$cookies.get('LOGIN_USER'):Vue.ls.get('LOGIN_USER', undefined)
    if(LOGIN_USER&&LOGIN_USER.id){
        switch (config.method) {
            case "post"||'POST':
                if (config.data) {
                    if (Array.isArray(config.data)) {
                        for (const d of config.data) {
                            d.createdUser = d.createdUser?d.createdUser:LOGIN_USER.id
                        }
                    } else {
                        config.data.createdUser = config.data.createdUser?config.data.createdUser:LOGIN_USER.id
                    }
                }
                break;
            case "put"||'PUT':
                if (config.data) {
                    config.data.updateUser = LOGIN_USER.id
                }
                break;
            case "patch"||'PATCH':
                if (config.data) {
                    config.data.updateUser = LOGIN_USER.id
                }
                break;
            default:
                break;
        }
    }

    return config;

}, (error) => {

    return Promise.reject(error);

});

axios.interceptors.response.use((response) => {

    NProgress.done();

    if (response.data.error.code !== '0') {
        Vue.prototype.$notification.error({
            message: response.data.error.code,
            description: response.data.error.message
        });
    }

    return response;

}, (error) => {

    NProgress.done();

    Vue.prototype.$notification.error({
        message: 'error',
        description: error.toString()
    });

    return Promise.reject(error);
});

export default axios;
