<template lang="pug">
div
  .modal
    .modal-bg
    .modal-body.modal-body-lg
      .display-flex
        .ml-auto.p-1 {{call.date | formatDate}}
      .p-1.form-grid
        .form-group.m-1
          label(for="phoneNumber") Номер телефона
          input.nevvi-fg-input(v-model="callInWork.phone" type="text" name="phone" id="phoneNumber" onclick="FormGroupInput(event)")
        .form-group.m-1
          label(for="name") Имя пользователя
          input.nevvi-fg-input(v-model="callInWork.name" type="text" name="name" id="name" onclick="FormGroupInput(event)")
        .form-group.m-1
          label(for="email") Почтовый адресс
          input.nevvi-fg-input(v-model="callInWork.email" type="email" name="email" id="email" onclick="FormGroupInput(event)")
        .form-group.m-1
          label(for="firm") Фирма
          input.nevvi-fg-input(v-model="callInWork.firm" type="firm" name="firm" id="firm" onclick="FormGroupInput(event)")
        .form-group.pr-4.pl-1
          .pl-05.color-gray Заметки
          textarea.nevvi-fg-textarea(v-model="callInWork.notes" type="notes" name="notes" id="notes" onclick="FormGroupInput(event)")
        div
          .p-2.bg-light.border-radius.bs-d.mb-1
            .pb-1.color-gray Напоминание звонка
            div
              //- label(for="pickDate") Выбрать дату
              input.bs-d(type="datetime-local" id="pickDate" v-model="reminder")
              button.btn-white.ml-1(@click="remind") Напомнить
            
          button.btn-success.color-white.mt-auto.ml-auto.mr-1.mb-1 Сохранить
</template>

<script>
export default {
  props: ['call'],
  data() {return{
    callInWork: {...this.call},
    reminder: null
  }},
  mounted() {
    allInputsCheck()
  },
  methods: {
    async remind() {
      await console.log(this.reminder);
      
    }
  }
}
</script>

<style lang="scss" scoped>
  input[type="datetime-local"] {
    padding: .4rem .5rem;
    border-radius: 4px;
    border: none;
    outline: none;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    // grid-gap: 1rem;

    div {
      vertical-align: top;
    }
  }
</style>