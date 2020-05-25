<template lang="pug">
div
  .modal
    .modal-bg(@click="toggleModalEditCategory")
    .modal-body.modal-body-lg
      .row
        h3.col-4.p-1
          span Категория:  
          span.color-blue {{category.titleRu}}
        .col-1.pt-1.bold
          .color-blue {{category.author.login}}
        .col.p-05.text-right
          button.btn.btn-outline-warning.color-dark(@click="saveChanges") Сохранить
          button.btn.btn-outline-danger.ml-03(:disabled="category.confirmed || disabledConfirm" @click="confirm") Подтвердить
      div
        .form-group.p-05
          label(for='titleRu') Русское название
          input.form-control(type='text' id="titleRu" v-model="category.titleRu" name='titleRu' placeholder='Русское название')
        .form-group.p-05
          label(for='titleUa') Украинское название
          input.form-control(type='text' id="titleUa" v-model="category.titleUa" name='titleUa' placeholder='Русское название')
        .form-group.p-05
          label(for='titleEn') Английское название
          input.form-control(type='text' id="titleEn" v-model="category.titleEn" name='titleEn' placeholder='Русское название')
</template>

<script>
export default {
  props: ['toggleModalEditCategory', 'editCategory', 'updateCategories'],
  data() {return{
    category: {...this.editCategory},
    disabledConfirm: true
  }},
  created () {
    let disable = false
    this.category.subCategories.map((subCategory, index) => {
      if (!subCategory.confirmed) return disable = true
    })
    this.disabledConfirm = disable
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('OLZ/Categories/changeCategory', {
        category: this.category,
        notify: this.$notify,
        update: this.update
      })      
    },
    update() {
      this.updateCategories()
      this.category = this.$store.getters['OLZ/Categories/getOneCategory'](this.category._id)
    },
    confirm() {
      this.$store.dispatch('OLZ/Categories/confirmCategory', {
        id: this.category._id,
        notify: this.$notify,
        update: this.update
      })
    }
  }
}
</script>