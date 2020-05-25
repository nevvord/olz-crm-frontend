export default async function({ store, $axios }){
  const response = await $axios.get(`/olz/categories/get`).catch(error => console.error(error.response.data.msg))
  store.dispatch('OLZ/Categories/updateCategories', response.data.categories)
}