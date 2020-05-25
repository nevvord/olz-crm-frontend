<template lang="pug">
div
  .modal
    .modal-bg(@click="openModal")
    .modal-body.modal-body-lg.bg-dark.color-white
      .p-05.bold.d-flex.cursor-pointer(@click="openData")
        .color-success {{user.login}}
        .ml-auto.mr-05(v-if="!showData") +
        .ml-auto.mr-05(v-if="showData") -
      .p-1.bg-light.color-dark(v-if="showData") {{changeUser}}
      .d-flex.border-t.border-white.px-1
        .col
          .py-05
            span.mr-05 Статус: 
            select.bg-dark.color-white.p-none.bs-none(v-model="changeUser.mode")
              option(value="0" v-if="$store.state.auth._USER.mode === 0") Супер админ
              option(value="1") Админ
              option(value="2") Работник
              option(value="3") Демонстрация
        .col
          .py-05
            span.mr-05 Доступ:
            input.mr-03(type="checkbox" id="admin" value="admin" v-model="changeUser.accesses") 
            label.mr-1(for="admin" :class="{'bg-dark': changeUser.accesses['admin']}") Администрация

            input.mr-03(type="checkbox" id="zvonilo" value="zvonilo" v-model="changeUser.accesses") 
            label.mr-1(for="zvonilo" :class="{'bg-dark': changeUser.accesses['admin']}") Звонило

            input.mr-03(type="checkbox" id="olz" value="olz" v-model="changeUser.accesses") 
            label.mr-1(for="olz" :class="{'bg-dark': changeUser.accesses['admin']}") Олз
      .text-right.p-03.border-t.border-white
        button.btn.btn-outline-success(@click="saveChanges") Сохранить

            
      
</template>
<script>
export default {
  props: ['openModal', 'user'],
  data: (vm = this) => ({
    changeUser: {...vm.user},
    showData: false
  }),
  methods: {
    openData() {this.showData = !this.showData},
    async saveChanges() {
      const body = {
        mode: this.changeUser.mode,
        accesses: this.changeUser.accesses
      }
      await this.$axios
      .put(`/administration/change/user/${this.user._id}`, body).then((response) => {
        const changedUserId = response.data.user._id
        const myID = this.$store.state.auth._USER._id
        this.$store.dispatch('admin/users/apdateOneUser', response.data.user)
        if (changedUserId === myID) {
          this.$store.dispatch('auth/updateUser', response.data.user)
        }
        this.$notify({
          group: 'foo',
          title: 'Success',
          text: response.data.msg,
          type: 'uccess'
        })
      }).catch((err) => {
        this.$notify({
          group: 'foo',
          title: `Ошибка: ${response.status}`,
          text: err.response.data.msg,
          type: 'error'
        })
      })
    }
  }
}
</script>