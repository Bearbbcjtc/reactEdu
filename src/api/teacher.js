import request from '../utils/request'

/*
    要求参数：
        page:       页码        必须
        pageSize:   每页条数    必须
        name:       教师姓名    可选
        subject:    教师学科    可选
        tel:        教师电话    可选
*/
export function teacherInfo(data){
    return request({
        url: '/teacher/teacherList', // 请求地址及方法都是后端定义好的
        method: 'post', 
        data
    })
}

export function addTeacher(data){
    return request({
        url: '/teacher/addTeacher', 
        method: 'post', 
        data
    })
}

// 需要id
export function editTeacher(data){
    return request({
        url: '/teacher/editTeacher', 
        method: 'post', 
        data
    })
}

// {id:id}
export function delTeacher(data){
    return request({
        url: '/teacher/delete', 
        method: 'post', 
        data
    })
}

//ids: [id数组] ids是键名一定要对应
export function batchDelete(data){
    return request({
        url: '/teacher/batchDelete', 
        method: 'post', 
        data
    })
}