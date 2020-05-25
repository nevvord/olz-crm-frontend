<template lang="pug">
div
  .p-05.row
    .form-group.col-4.px-05
      label(for="titleRu") 
        span Русское название
        span.color-danger *
      input.br(
        type="text"
        id="titleRu"
        v-model.trim="$v.form.titleRu.$model"
        :class="{'border-success': !$v.form.titleRu.$invalid, 'border-danger': $v.form.titleRu.$invalid && $v.form.titleRu.$model}"
      )
      div
    .form-group.col-4.px-05
      label(for="titleUa") Украинское название
      input.border-blue.br(type="text" id="titleUa" v-model="form.titleUa")
    .form-group.col-4.px-05
      label(for="titleEn") English name
      input.border-blue.br(type="text" id="titleEn" v-model="form.titleEn")
    .text-right.col-12.pt-1
      button.btn.btn-success(
        @click="addCategory"
        :disabled="$v.form.titleRu.$invalid"
      )
       span Добавить
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators' 
export default {
  props: ['toggleWindowAddCategory', 'pushStatusSubCategories'],
  data() {return{
    form: {
      titleRu: null, titleUa: null, titleEn: null
    },
    categories: this.$store.getters['OLZ/categories/getCategories']
  }},
  methods: {
    async addCategory() {
      await this.pushStatusSubCategories()
      this.$store.dispatch('OLZ/Categories/addCategory', {form: this.form, notify: this.$notify})
      this.toggleWindowAddCategory()
    }
  },
  validations: {
    form: {
      titleRu: {
        required,
        maxLength: maxLength(20)
      }
    }
  }
}
</script>