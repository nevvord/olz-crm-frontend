<template lang="pug">
div
  .modal
    .modal-bg(@click="toggleModalAddNewUser")
    .modal-body.modal-body-lg.p-1.row
      .col-12
        h3.color-gray.px-05.pb-1.color-main Добавить нового пользователя
      .form-group.col-xl-4.px-05
        label.color-gray(for="login") Логин
        input.border-light-1.br(type="text" id="login" v-model="form.login")
      .form-group.col-xl-4.px-05
        label.color-gray(for="password") Пароль
        input.border-light-1.br(type="text" id="password" v-model="form.password")
      .form-group.col-xl-4.px-05
        label.color-gray(for="status") Статус
        select.d-block.border-light-1.br.p-05.w-100(type="text" id="password" v-model="form.status")
          option(value="0" v-if="$store.state.auth._USER.mode === 0") Супер админ
          option(value="1") Админ
          option(value="2") Работник
          option(value="3") Демонсртрация
      .col-xl-12.px-05.my-1
        .color-blue Права доступа
        .d-flex
          .p-03
            input.ml-03(type="checkbox" id="zvonilo" value="zvonilo" v-model="form.accesses")
            label(for="zvonilo") Звонило
          .p-03
            input.ml-03(type="checkbox" id="olz" value="olz" v-model="form.accesses")
            label(for="olz") OLZ
          .p-03
            input.ml-03(type="checkbox" id="admin" value="admin" v-model="form.accesses")
            label(for="admin") Админ
      .col-12.text-right
        button.btn.btn-blue(@click="addNewUser") Добавить

</template>

<script>
export default {
  props: ['toggleModalAddNewUser'],
  data: () => ({
    form: {
      login: null,
      password: null,
      status: 2,
      accesses: []
    }
  }),
  methods: {
    addNewUser() {
      const sc = process.env.SECRET_KEY
      this.$store.dispatch('admin/users/addNewUser', {form: this.form, notify: this.$notify, sc})
    }
  }
}
</script>