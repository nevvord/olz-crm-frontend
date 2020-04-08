<template lang="pug">
div
  .app(v-if="$store.state.auth._AUTH")
    Navbar
    Sidebar
    nuxt.pages
  div(v-else) 
    .auth
      .auth-body 
        p Введите логин и пароль
        form(@submit.prevent="signin")
          input(type="text" name="login" placeholder="Enter login" v-model="form.login")
          input(type="password" name="password" placeholder="Enter password" v-model="form.password")
          button(type='submit') Вход
  notifications(group="foo" position="bottom right")
  #admin-place
    p(v-if="$store.state.zvonilo._DATA") log: {{$store.state.zvonilo._DATA[0].type}}
</template>
<script>
import Navbar from '~/components/Navbar'
import Sidebar from '~/components/Sidebar'
export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      form: {
        login: '',
        password: ''
      }
    }
  },
  mounted() {
    let kombo = {
      first: '',
      second: ''
    }
    const adminPlace = document.getElementById('admin-place')
    document.addEventListener('keypress', (event) => {
      if (!kombo.first) kombo.first = event.key
      if (kombo.first) {
        kombo.second = kombo.first
        kombo.first = event.key
      }
      if (kombo.first === ']' && kombo.second === '[') {
        console.log(kombo);
        
        kombo.first = ''
        kombo.second = ''
        if (!adminPlace.style.top) return adminPlace.style.top = '-5rem'
        if (adminPlace.style.top === '-5rem') adminPlace.style.top = null
      }
    })
  },
  methods: {
    signin() {
      this.$axios.post('/auth/signin', this.form)
        .then(({data}) => {
          this.$store.dispatch('auth/signin')
          localStorage.setItem('token', data.token)
          this.$notify({
            group: 'foo',
            title: 'Успешно',
            text: `${data.msg}`,
            type: 'success'
          })
        })
        .catch(({response}) => {
          this.$notify({
            group: 'foo',
            title: `Ошибка: ${response.status}`,
            text: response.data.msg,
            type: 'error'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
#admin-place {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 4rem;
  box-shadow: 0 0 6px #00000040;
  z-index: 9999;
  background-color: #fff;
  transition: .3s;
}
.app {
  display: grid;
  height: 100vh;
  grid-template: auto 1fr / auto 1fr;

  div {
    &:nth-child(1) {
      grid-column: 1 / -1;
    }

    &:nth-child(2) {
      grid-row: 2 / -1;
    }
  }

  .pages {
    background-color: #ececec;
    .content {
      width: 100%;
      overflow-y: auto;
      overflow-x: none;
      padding: 15px;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.507);
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.637);
        outline: 1px solid rgb(0, 0, 0);
      }
    }
  }
}

.auth {
  background: rgb(9,9,121);
  background: linear-gradient(180deg, rgba(9,9,121,1) 0%, rgba(71,21,37,1) 100%);
  height: 100vh;
  &-body {
    text-align: center;
    position: absolute;
    left: 40%;
    right: 40%;
    top: 20%;
    background-color: #f1f1f1;
    border-radius: 4px;
    padding: .5rem;
    box-shadow: 0 0 10px #00000080;
    p {
      color: #444;
      padding: .3rem;
    }

    form {
      margin: 0 auto;
      input {
        display: block;
        padding: .5rem;
        border-radius: 4px;
        border: 1px solid #33333320;
        width: 80%;
        margin: 0 auto;
        margin-bottom: 1rem;
      }
      button {
        padding: .5rem 2rem;
        margin-bottom: .5rem;
        border-radius: 4px;
        border: 1px solid #334088;
        background-color: #445099;
        color: white;
        box-shadow: 0 0 10px #00000040;
      }
    }

  }
}
</style>
