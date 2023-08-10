const initState = {type: '', payload: {}};
export function loginReducer(prevState = initState, action){
    const {type, payload} = action;
    if(type === 'login'){
        return payload;
    }
    return prevState;
}

const menu = [];
export function menuReducer(prevState = menu, action){
    const {type, payload} = action;
    if(type === 'menu'){
        return payload;
    }
    return prevState;
}

