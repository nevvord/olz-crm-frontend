export const state = () => ({
    _DATA: null
})

export const mutations = {
    UPDATE_DATA(state, newData) { state._DATA = newData },
}

export const actions = {
    getCalls({commit}) {
        this.$axios.get('/zvonilo/getcalls')
            .then(response => {
                console.log(response);
                commit('UPDATE_DATA', response.data.calls)
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const getters = {
    getData: state => state._DATA
}