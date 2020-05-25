export default ({ $axios, store}) => {
  const token = localStorage.getItem("token")
  if (token) {
    $axios.onRequest(config => {
      config.headers.common['Authorization'] = `Bearer ${token}`
    })
  }
}