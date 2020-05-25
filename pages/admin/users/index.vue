<template lang="pug">
div
  Modal(v-if="showModal" :openModal="openModal" :user="userForChange")
  ModalAddNew(v-if="modals.addNew" :toggleModalAddNewUser="toggleModalAddNewUser")
  .container
    .bs.br-t.bg-blue.d-flex.p-03
      h3.p-05.color-white Пользователи
      .ml-auto 
        button.btn.btn-outline-white(@click="toggleModalAddNewUser") Добаить нового 
    .row.m-none.br-b.bs.bg-white
      .col-12.p-none.listes(v-for="(user, index) in users" :key="index")
        div.hover-light-05
          .row
            .col
              div.p-03
                small.b-block.color-blue.bold Логин
                div {{user.login}}
            .col
              div.p-03
                small.b-block.color-blue.bold Сатус
                div(v-if="user.mode === 0") Супер админ
                div(v-if="user.mode === 1") Админ
                div(v-if="user.mode === 2") Работник
                div(v-if="user.mode === 3") Демонстарция
            .col
              div.p-03
                small.b-block.color-blue.bold Дата регистрации
                div {{user.date | formatDate}}
            .col
              div.p-03
                small.b-block.color-blue.bold Создатель
                div(v-if="user.creator") {{user.creator.login}}
                div(v-else) SUPERADMIN
            .col
              div.p-03
                small.b-block.color-blue.bold Права доступа
                div
                  span(v-for="(access, index) in user.accesses" :key="index") {{access}} 
            .col-2
              .text-right.p-03
                button.btn.btn-success(v-if="$store.state.auth._USER.mode <= 1" @click="openModal(index)") Изменить

</template>
<script>
import Modal from '~/components/admin/users/Modal'
import ModalAddNew from '~/components/admin/users/ModalAddNew'
export default {
  middleware: 'admin/getUsers',
  components: {
    Modal,
    ModalAddNew
  },
  data: (vm = this) => ({
    users: vm.$store.getters["admin/users/getUsers"],
    showModal: false,
    userForChange: null,
    modals: {
      addNew: false
    }
  }),
  methods: {
    openModal(index) {
      this.showModal = !this.showModal
      this.userForChange = this.users[index]
    },
    toggleModalAddNewUser() {this.modals.addNew = !this.modals.addNew}
  }
}
</script>