import {
    SET_LOADING,
    SET_LOGIN,
    SET_ORDER,
    SET_POPUP,
    SET_RENDER,
    SET_USER
}
from './constant'

export const setLogin = payload => {
    return {
        type: SET_LOGIN,
        payload
    }
}

export const setLoading = payload => {
    return {
        type: SET_LOADING,
        payload
    }
}

export const setPoPup = payload => {
    return {
        type: SET_POPUP,
        payload
    }
}

export const setUser = payload => {
    return {
        type: SET_USER,
        payload
    }
}

export const setRender = () => {
    return {
        type: SET_RENDER
    }
}

export const setOrder = payload => {
    return {
        type: SET_ORDER,
        payload
    }
}