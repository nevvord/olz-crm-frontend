<template lang="pug">
div
  .modal
    .modal-bg(@click="closeModal")
    .modal-body.modal-body-lg
      .display-flex
        .ml-auto.p-1.ts {{callInWork.date | formatDate}}
      .form-grid
        .inputs.bs.p-2
          .form-group-material.mb-2
            label(for="phoneNumber") Номер телефона
            input.nevvi-fg-input(v-model="callInWork.phone" type="text" name="phone" id="phoneNumber" onclick="FormGroupInput(event)")
          .form-group-material.mb-2
            label(for="name") Имя пользователя
            input.nevvi-fg-input(v-model="callInWork.name" type="text" name="name" id="name" onclick="FormGroupInput(event)")
          .form-group-material.mb-2
            label(for="email") Почтовый адресс
            input.nevvi-fg-input(v-model="callInWork.email" type="email" name="email" id="email" onclick="FormGroupInput(event)")
          .form-group-material.mb-2
            label(for="firm") Фирма
            input.nevvi-fg-input(v-model="callInWork.firm" type="firm" name="firm" id="firm" onclick="FormGroupInput(event)")
          .form-group-material.pr-1
            .pl-03.pb-03.color-gray Заметки
            textarea.nevvi-fg-textarea(v-model="callInWork.notes" type="notes" name="notes" id="notes" onclick="FormGroupInput(event)")
        .picked
          TypeChanger(:index="reminderIndex" :id="callInWork._id")
          StatusChanger(:index="reminderIndex" :id="callInWork._id")
          Reminder(:index="reminderIndex" :id="callInWork._id")
          div.ml-auto
            button.btn.btn-success.color-white.mr-1(@click="changeCall") Сохранить
            button.btn.btn-danger.color-white(@click="replaceBasket") В корзину

</template>

<script>
import StatusChanger from '~/components/Zvonilo/Modal/statusChanger'
import TypeChanger from '~/components/Zvonilo/Modal/typeChanger'
import Reminder from '~/components/Zvonilo/Modal/Reminder'
export default {
  props: ['closeModal', 'reminderIndex', 'changeCalls'],
  components: {
    StatusChanger,
    TypeChanger,
    Reminder
  },
  data() {return{
    callInWork: {...this.$store.getters['zvonilo/getOneData'](this.reminderIndex)}
  }},
  mounted() {
    allInputsCheck()
  },
  methods: {
    changeCall() {
      const body = {
        phone: this.callInWork.phone,
        name: this.callInWork.name,
        email: this.callInWork.email,
        firm: this.callInWork.firm,
        notes: this.callInWork.notes
      }

      this.$axios
        .put(`/zvonilo/changecall/${this.callInWork._id}`, body)
        .then(({data}) => {
          this.$store.dispatch('zvonilo/changeCall', { index: this.reminderIndex, body })
          this.$notify({
            group: 'foo',
            title: `Успешно!`,
            text: data.msg,
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
    },
    replaceBasket() {
      const id = this.callInWork._id
      this.$axios
        .put(`/zvonilo/replacebasket/${id}`)
        .then(({ data }) => {
          this.$store.dispatch('zvonilo/replaceBasket', id)
          this.changeCalls(id)
          this.closeModal()
          this.$notify({
            group: 'foo',
            title: `Успешно!`,
            text: data.msg,
            type: 'success'
          })
        })
        .catch(({ response }) => {
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

<style lang="scss">
  input[type="datetime-local"] {
    padding: .4rem .5rem;
    border-radius: 4px;
    border: none;
    outline: none;
  }
  .status-pick, .type-pick {
    cursor: pointer;
    :hover {
    }
    :disabled {
      opacity: .5;
    }
    &:first-child {
      border-radius: 4px 0 0 4px;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    padding: 1rem 1rem 2rem 1rem;
  }
</style>