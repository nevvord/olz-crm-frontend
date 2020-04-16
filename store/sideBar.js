export const state = () => ({
    _BAR: null
})

export const mutations = {
    CHANGE_BAR(state, bar) {state._BAR = bar}
}

export const actions = {
    changeBar: ({commit}, bar) => {
        commit('CHANGE_BAR', bar)
    }
}

export const getters = {
    getAuth: state => state._AUTH
}