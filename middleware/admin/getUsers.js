export default async function({ store, $axios }){
  const users = await $axios.$get(`/administration/get/allusers`)
  store.commit('admin/users/UPDATE_USERS', users)
}