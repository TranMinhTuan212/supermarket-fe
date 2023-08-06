import { SET_LOADING, SET_LOGIN, SET_ORDER, SET_POPUP, SET_RENDER, SET_USER } from "./constant"



export const initState = {
    login: '',
    isLoading: false,
    user: null,
    render: false,
    order: null,
    popup: null
}


export const reducer = (state, action) => {
    switch(action.type){
        case SET_LOGIN:
            return {
                ...state,
                login: action.payload
            }
        case SET_LOADING: 
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_RENDER:
            return{
                ...state,
                render: !state.render
            }
        case SET_ORDER:
            return{
                ...state,
                order: action.payload
            }
        case SET_POPUP:
            return {
                ...state,
                popup: action.payload
            }
        default :
        return new Error('action is not valid !')
    }
}