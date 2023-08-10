import axios from 'axios';
import { message } from 'antd';

const service = axios.create({
    baseURL: 'http://47.98.219.152:3000'
})

// 请求拦截器
service.interceptors.request.use(config=>{
    if(sessionStorage.getItem('token')){
        config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    }
    return config
})

// 响应拦截器
service.interceptors.response.use(response=>{
    const data = response.data
    if(data.code === -1){
        message.error( data.msg ||'bb说不行哟' );
        return Promise.reject(data.msg ||'bb说不行哟') //一定要返回一个失败的promise
    }
    console.log("响应拦截器",data)
    return data
})

export default service  // 导出axios实例