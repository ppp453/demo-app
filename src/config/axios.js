import QS from 'qs'
import Axios from 'axios'
import common from './common'
import Vue from 'vue'
import router from '@/router/index';

Axios.defaults.headers['Content-Type']='application/json';

Axios.interceptors.request.use(
    config => {
        config.timeout=5000;
        config.baseURL=common.BASEURL;
        config.headers.token = localStorage.getItem('token') || '';
        return config;
    },
    error=>{
        Vue.prototype.$Message.warning('加载超时');
        return Promise.error(error);
    }
)

Axios.interceptors.response.use(    
    response => {   
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.data.code == 200) {     
            return Promise.resolve(response); 
        } else {
            return Promise.reject(response);
        }    
    },    
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求';
                    break;
                case 401:
                    error.message = '未授权，请重新登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源';
                    break;
                case 405:
                    error.message = '请求方法未允许';
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = '服务器端出错';
                    break;
                case 501:
                    error.message = '网络未实现';
                    break;
                case 502:
                    error.message = '网络错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网络超时';
                    break;
                case 505:
                    error.message = 'http版本不支持该请求';
                    break;
                default:
                    error.message = `连接错误${error.response.status}`;
            }
            let errorData = {
                status: error.response.status,
                message: error.message,
                config: error.response.config
            };
            Vue.prototype.$Message.error(errorData.message);
            if (errorData.status === 401 || errorData.status === 403) {
                router.push({name:'login'});
            }
        }
        return Promise.reject(error);
    }    
);

export default {
    Axios,
    get:function(url, params){    
        return new Promise((resolve, reject) =>{        
            Axios.get(url, {            
                params: params        
            }).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err.data);        
            });   
        });
    },

    post:function(url, params) {
        return new Promise((resolve, reject) => {
            Axios.post(url, JSON.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data);
            })
        });
    }
}