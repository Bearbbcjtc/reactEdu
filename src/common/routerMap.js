export const asyncRouterMap = [
    {
        path: '/home',
        name: 'Home',
        meta: {title: '首页', role: ['admin', 'teacher', 'manager'], icon: 'team'},
    },
    {
        path: '/personal',
        name: 'Personal',
        meta: {title: '个人中心', role: ['admin', 'teacher', 'manager'], icon: 'team'},
    },
    {
        path: '/teacher',
        name: 'Teacher',
        meta: {title: '教师管理', role: ['admin'], icon: 'team'},
    },
    {
        path: '/adminissions',
        name: 'Adminissions',
        meta: {title: '招生管理', role: ['admin', 'manager'], icon: 'customer-service'},
        children: [
            {
                path: '/adminissions/intentional',
                name: 'Intentional',
                meta: {title: '意向学员管理', role: ['admin', 'manager'], icon: 'smile', bread: ['招生管理', '意向学员管理']},
            },
            {
                path: '/adminissions/solicitation',
                name: 'Solicitation',
                meta: {title: '邀约查询', role: ['admin'], icon: 'profile', bread: ['招生管理', '邀约查询']},
            },
        ]
    },
    {
        path: '/student',
        name: 'Student',
        meta: {title: '学生管理', role: ['admin', 'teacher', 'manager'], icon: 'solution'},
        children: [
            {
                path: '/student/info',
                name: 'Info',
                meta: {title: '学生信息', role: ['admin', 'teacher', 'manager'], icon: 'file-text', bread: ['学生管理', '学生信息']},
            },
            {
                path: '/student/exam',
                name: 'Exam',
                meta: {title: '考试管理', role: ['admin', 'teacher'], icon: 'form', bread: ['学生管理', '学生信息']},
            },
        ]    
    },
    {
        path: '/class',
        name: 'Class',
        meta: {title: '排课管理', role: ['admin'], icon: 'unordered-list'},
    },
    {
        path: '/administrative',
        name: 'Administrative',
        meta: {title: '行政管理', role: ['admin'], icon: 'car'},
    },
    {
        path: '/finance',
        name: 'Finance',
        meta: {title: '财务管理', role: ['admin'], icon: 'account-book'},
    },
];