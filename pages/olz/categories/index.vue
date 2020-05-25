<template lang="pug">
div
  //-  Модальные окна
  ModalAddSubCategory(
    v-if="windows.modalSubCategory"
    :toggleModalSubcategory="toggleModalSubcategory"
    :idAddSubCategory="idAddSubCategory"
    :nameAddSubcategory="nameAddSubcategory"
  )
  ModalEditCategory(
    v-if="windows.modalEditCategory"
    :toggleModalEditCategory="toggleModalEditCategory"
    :editCategory="editCategory"
    :updateCategories="updateCategories"
  )
  ModalEditSubCategory(
    v-if="windows.modalEditSubCategory"
    :editSubCategory="editSubCategory"
    :toggleModalEditSubCategory="toggleModalEditSubCategory"
    :updateCategories="updateCategories"
  )
  .container
    h1.py-1 Категории
    .p-1.bs.br.bg-white
      .categories
        .category.border.br.mb-1.border-blue(v-for="(category, index) in  categories" :key="index")
          .row
            .col-sm-6.col-xl-2.p-1
              .color-blue Английское название
              div {{category.titleEn}}
            .col-sm-6.col-xl-2.p-1
              .color-blue Украинское название
              div {{category.titleUa}}
            .col-sm-6.col-xl-2.p-1
              .color-blue Русское название
              div {{category.titleRu}}
            .col-sm-6.col-xl-2.p-1
              .color-blue Подвер/Созданно
              .d-flex
                .text-center.br.color-white.px-1(
                  :class="{'bg-danger': !category.confirmed, 'bg-success': category.confirmed}"
                )
                  span {{category.confirmed}}
                .text-center.br.color-white.px-1.ml-03(
                  :class="{'bg-danger': !category.created, 'bg-success': category.created}"
                )
                  span {{category.created}}
            .col-sm-4.col-xl-1.p-1
              .color-blue Автор
              div {{category.author.login}}
            .col-sm-8.col-xl-3.p-1.text-right
              button.btn.btn-outline-dark(@click="openSubcategories(index)")
                span(v-if="!windows.subCategories[index].status") Открыть
                span(v-else) Закрыть
              button.btn.btn-outline-dark.ml-1.cp(@click="toggleModalEditCategory(index)") Редактировать
          .subCategories.border-t.border-blue(v-if="windows.subCategories[index].status")
            .subcategory.row.bg-success-01.border-b.border-blue.bs-inset(v-for="(subCategory, i) in category.subCategories")
              .col-xl(:class="{'mb-1': category.subCategories.length > 1}")
                .row
                  .col-2.p-1
                    .color-blue Русское название
                    div {{subCategory.titleRu}}
                  .col-2.p-1
                    .color-blue Украинское название
                    div {{subCategory.titleUa}}
                  .col-2.p-1
                    .color-blue Английское название
                    div {{subCategory.titleEn}}
                  .col-2.p-1
                    .color-blue Подвер/Созданно
                    .row
                      .text-center.br.color-white.col.mx-05(
                        :class="{'bg-danger': !subCategory.confirmed, 'bg-success': subCategory.confirmed}"
                      )
                        span {{subCategory.confirmed}}
                      .text-center.br.color-white.col.mx-05(
                        :class="{'bg-danger': !subCategory.created, 'bg-success': subCategory.created}"
                      )
                        span {{subCategory.created}}
                  .col-1.p-1
                    .color-blue Автор
                    div {{category.author.login}}
                  .col.p-1.text-right 
                    button.btn.btn-outline-dark(@click="toggleModalEditSubCategory(category._id, subCategory._id)") Редактировать

            .row
              .p-1.bold.color-warning.col-4(v-if="category.subCategories.length === 0") Подкатегории отсутствуют
              .col.p-1.bold.text-center.color-blue.cursor-pointer.hover-blue(
                @click="toggleModalSubcategory(category._id, category.titleRu)"
              )
                span Добавть подкатегорию
      .border.border-blue.br
        ButtonAdddCategory(:toggleWindowAddCategory="toggleWindowAddCategory" :windows="windows")
        AddCategory(v-if="windows.addCategory" :toggleWindowAddCategory="toggleWindowAddCategory" :pushStatusSubCategories="pushStatusSubCategories")
</template>

<script>
import AddCategory from '~/components/OLZ/Categories/AddCategory'
import ButtonAdddCategory from '~/components/OLZ/Categories/ButtonAddcategory'
import ModalAddSubCategory from '~/components/OLZ/Categories/Modals/addSubCategory'
import ModalEditCategory from '~/components/OLZ/Categories/Modals/editCategory'
import ModalEditSubCategory from '~/components/OLZ/Categories/Modals/editSubCategory'
export default {
  middleware: 'olz/categories/getCategories',
  components: {
    AddCategory,
    ButtonAdddCategory,
    ModalAddSubCategory,
    ModalEditCategory,
    ModalEditSubCategory
  },
  data() {return{
    windows: {
      addCategory: false,
      subCategories: [].map.call(this.$store.getters['OLZ/Categories/getCategories'], () => { return {status: false} }),
      modalSubCategory: false,
      modalEditCategory: false,
      modalEditSubCategory: false
    },
    categories: this.$store.getters['OLZ/Categories/getCategories'],
    idAddSubCategory: null,
    nameAddSubcategory: null,
    editCategory: null,
    editSubCategory: null
  }},
  methods: {
    toggleWindowAddCategory() { this.windows.addCategory = !this.windows.addCategory },
    openSubcategories(index) { this.windows.subCategories[index].status = !this.windows.subCategories[index].status },
    pushStatusSubCategories() { this.windows.subCategories.push({status: false})},
    toggleModalEditCategory(index) {
      this.windows.modalEditCategory = !this.windows.modalEditCategory
      this.editCategory = index !== undefined ? this.categories[index] : null
    },
    toggleModalSubcategory(id, name) {
      this.windows.modalSubCategory = !this.windows.modalSubCategory
      this.idAddSubCategory = id
      this.nameAddSubcategory = name
    },
    updateCategories(cb) {
      this.categories = this.$store.getters['OLZ/Categories/getCategories']
      if (cb) cb()
    },
    toggleModalEditSubCategory(category, subCategory) {
      this.windows.modalEditSubCategory = !this.windows.modalEditSubCategory
      this.editSubCategory = {category, subCategory}
    }
  }
}
</script>