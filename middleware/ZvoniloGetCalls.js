export default async function({ store, $axios }){
    await $axios
        .get('/zvonilo/getcalls')
        .then(res => {
            store.commit('zvonilo/UPDATE_DATA', res.data.calls)
        })
        .catch(err => {
            console.log(err)
        })
}