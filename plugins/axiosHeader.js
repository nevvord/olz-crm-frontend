export default function ({ $axios, app, store}) {
  const token = localStorage.getItem("token")
  if (token) {
    $axios.onRequest(config => {
      config.headers.common['Authorization'] = `Bearer ${token}`
    })
    $axios.get('/auth/verify').then(res => {
      store.dispatch('auth/signin')
    })
  }
}