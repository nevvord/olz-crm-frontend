<template lang="pug">
.p-1
  .p-1.bg-white.bs.border-radius
    form(@submit.prevent="addNew")
      div
        label.mb-05.color-gray.display-block(for="phoneNumber") Номер телефона
        input.border.p-05.color-gray.bs.border-radius.px-1.fs-1(
          v-model.trim="$v.phone.$model"
          type="tel"
          id="phoneNumber" 
          name="phone"
          placeholder="380733773377"
          :class="{'border-danger': $v.phone.$invalid && $v.phone.$model, 'border-success': !$v.phone.$invalid, 'border-light': !$v.phone.$model}"
        )
        .border.border-danger.p-05.bg-danger-05.border-radius.w-fc.mt-05.bs-danger(v-if="$v.phone.$model && $v.phone.$invalid")
          p(v-if="!$v.phone.required") Требуется ввести номер
          p(v-if="!$v.phone.minLength") Не мение 12 символов
        div.border.border-success.p-05.bg-success-05.border-radius.w-fc.mt-05.bs-success(v-if="$v.phone.$model && !$v.phone.$invalid")
          .color-gray Удалось! Итог номера телефона: {{$v.phone.$model}}
      div
        label.mb-05.color-gray.display-block.mt-2(for="name") Имя (Это поле не обязательно)
        input.border.border-light.p-05.color-gray.bs.border-radius.px-1.fs-1(
          v-model="name"
          type="text"
          id="name"
          name="name"
          placeholder="Леонардо Ди Каприо"
        )
      .diplay-block.py-2
        button.btn-success.color-white(type="submit") Добавить
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {return{
    phone: '',
    name: ''
  }},
  methods: {
    async addNew() {
      this.$v.$touch()
      if(!this.$v.$invalid){
        await this
          .$axios
          .post('/zvonilo/addnewcall', {phone: this.phone, name: this.name})
          .then(({data}) => {
            this.phone = ''
            this.name = ''
            this.$notify({
              group: 'foo',
              title: `Успешно!`,
              text: data.msg,
              type: 'success'
            })
          })
          .catch(error => {
            console.error(error);
            this.$notify({
              group: 'foo',
              title: error.response.status,
              text: error.response.data.msg,
              type: 'error'
            })
          })
      }else{
        this.$notify({
          group: 'foo',
          title: `Валидация`,
          text: `Введите пожалуйста все данные`,
          type: 'error'
        })
      }
    }
  },
  validations: {
    phone: {
      required,
      minLength: minLength(12)
    }
  }

}
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
</style>