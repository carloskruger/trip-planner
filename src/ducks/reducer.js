const initialState = {
    user: {id: null,
    username: '',
    useremail: ''}
}

const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";


export function registerUser(user){
    return {
        type: REGISTER_USER,
        payload: user
    }
}

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser(){
    return{
        type: LOGOUT_USER,
        payload: initialState
    }
}





export default function reducer(state = initialState, action){
     console.log(action.type)
     console.log(action.payload)

    switch(action.type){

        case REGISTER_USER:
            return {...state, user: action.payload, isLoggedIn: true}
        case LOGIN_USER:
            return {...state,user: action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        default:
            return state;
    }


} 