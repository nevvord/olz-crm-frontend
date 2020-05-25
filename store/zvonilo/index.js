export const state = () => ({
    _DATA: null
})

export const mutations = {
    UPDATE_DATA(state, newData) { state._DATA = newData },
    UPDATE_REMINDER(state, { index, date }) { state._DATA[index].reminder = date },
    CHANGE_STATUS(state, { index, status}) {state._DATA[index].status = status},
    CHANGE_TYPE(state, { index, type}) {state._DATA[index].type = type},
    CHANGE_CALL(state, {index, curentCall}) {state._DATA[index] = curentCall},
    DELETE_CALL(state, id) {state._DATA = state._DATA.filter(call => call._id !== id )},
    MERGE_DATA(state, newData) {state._DATA = state._DATA.concat(newData)}
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
    },
    changeReminder({ commit }, { index, date }) {
        commit('UPDATE_REMINDER', { index, date })
    },
    changeStatus({ commit }, {status, index}) {
        commit('CHANGE_STATUS', {index, status})
    },
    changeType({ commit }, {type, index}) {
        commit('CHANGE_TYPE', {index, type})
    },
    changeCall({ commit, state }, { body, index }) {
        const curentCall = {...state._DATA[index], ...body}
        commit('CHANGE_CALL', { index, curentCall })
    },
    replaceBasket({ commit }, id) {
        commit('DELETE_CALL', id)
    },
    async updateCallsAndMerge({commit, getters}, { vm, type }) {
        const pagination = process.env.ZVONILO_PAGINATION
        const skip = getters['getData'].length
        let newData = null
        if (type === "all"){
            newData = await this.$axios.$get(`/zvonilo/get/calls/${skip}/${pagination}`)
        }
        if (type === "cold"){
            newData = await this.$axios.$get(`/zvonilo/get/calls/cold/${skip}/${pagination}`)
        }
        if (type === "hot"){
            newData = await this.$axios.$get(`/zvonilo/get/calls/hot/${skip}/${pagination}`)
        }
        vm.$notify({
            group: 'foo',
            title: `Загрузка успешна`,
            text: `Загруженно еще ${newData.calls.length} клиентов`,
            type: 'info'
        })
        commit('MERGE_DATA', newData.calls)
    }
}

export const getters = {
    getData: state => state._DATA,
    getOneData: state => index => state._DATA[index],
    getOneStatus: state => index => state._DATA[index].status,
    getOneType: state => index => state._DATA[index].type,
    getOneReminder: state => index => state._DATA[index].reminder
}