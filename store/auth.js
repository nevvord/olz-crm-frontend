export const state = () => ({
    _DATA: null,
    _AUTH: false
})

export const mutations = {
    SIGNIN_CHANGE_AUTH: state => state._AUTH = true,
    LOGOUT_CHANGE_AUTH: state => state._AUTH = false
}

export const actions = {
    signin: ({commit}) => {
        commit('SIGNIN_CHANGE_AUTH')
    }
}

export const getters = {
    getAuth: state => state._AUTH
}