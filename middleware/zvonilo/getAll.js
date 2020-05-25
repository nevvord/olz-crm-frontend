export default async function({ store, $axios }){
    const pagination = process.env.ZVONILO_PAGINATION
    const skip = 0
    await $axios.get(`/zvonilo/get/calls/${skip}/${pagination}`).then(res => {
        store.commit('zvonilo/UPDATE_DATA', res.data.calls)
    }).catch(err => {
        console.error(err)
    })
}