export const state = () => ({
    _DATA: null,
    _USER: null,
    _AUTH: false
})

export const mutations = {
    SIGNIN_CHANGE_AUTH: state => state._AUTH = true,
    LOGOUT_CHANGE_AUTH: state => state._AUTH = false,
    UPDATE_USER: (state, user) => state._USER = user,
    UPDATE_USERS_CHARACTERISTICS: (state, char) => state._USER = {...state._USER, ...char}
}

export const actions = {
    signin: ({commit}) => commit('SIGNIN_CHANGE_AUTH'),
    logout: ({commit}) => {
        commit('LOGOUT_CHANGE_AUTH')
        localStorage.removeItem('token')
    },
    updateUser: ({commit}, user) => commit('UPDATE_USER', user),
    updateUserChar: ({commit}, char) => commit('UPDATE_USERS_CHARACTERISTICS', char)
}

export const getters = {
    getAuth: state => state._AUTH,
    getUser: state => state._USER,
    getAccesses: state => {
        let accesses = {}
        state._USER.accesses.map(access => {
            accesses = {...accesses, [access]: true}
        })
        return accesses
    }
}