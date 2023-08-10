import request from '../utils/request'

export function login(data){
    return request({
        url: '/user/login', // 请求地址及方法都是后端定义好的
        method: 'post', 
        data
    })
}

export function regetInfo(){
    return request({
        url: '/user/getInfo', 
        method: 'get', 
    })
}