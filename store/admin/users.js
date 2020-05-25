export const state = () => ({
  _DATA: null,
  _USERS: null
})

export const mutations = {
  UPDATE_USERS: (state, users) => state._USERS = users,
  UPDATE_ONE_USER: (state, {data, index}) => state._USERS[index] = data,
  ADD_NEW_USER: (state, user) => state._USERS.push(user)
}

export const actions = {
  apdateOneUser: ({state, commit}, data) => {
    state._USERS.map((user, index) => {
      if (user._id === data._id) commit('UPDATE_ONE_USER', {data, index}) 
    })
  },
  async addNewUser({commit}, {form, notify, sc}) {
    await this.$axios.post('/user/auth/signup', {...form, mode: form.status, sc}).then(result => {
      commit('ADD_NEW_USER', result.data.user)
      notify({
        group: 'foo',
        title: `Успешно!`,
        text: result.data.msg,
        type: 'success'
      })
    }).catch(err => {
      notify({
        group: 'foo',
        title: `ERROR`,
        text: err.responce.data.msg,
        type: 'error'
      })
    })
  }
}

export const getters = {
  getUsers: state => state._USERS
}