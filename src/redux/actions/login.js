export const loginAction = (payload) => {
    return {
        type: 'login',
        payload
    }
};

export const menuAction = (payload) => {
    return {
        type: 'menu',
        payload
    }
};

//type不能相同，否则会被覆盖