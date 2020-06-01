<template lang="pug">
div
  .modal
    .modal-bg(@click="toggleModalEditSubCategory")
    .modal-body.modal-body-lg
      .row
        .col
          .row
            h3.col-2.p-05.color-blue {{subCategory.titleRu}}
            .col-6.pt-03
              button.btn.btn-danger(v-if="!subCategory.confirmed") Не Подтвержденно
              button.btn.btn-success(v-if="subCategory.confirmed") Подтвержденно
              div {{subCategory.creted}}
        .col-4.text-right.p-03
          button.btn.btn-outline-warning.color-dark(@click="saveChanges") Сохранить
          button.btn.btn-outline-danger.ml-03(@click="confirm" :disabled="$store.state.auth._USER.mode !== 0 || subCategory.confirmed") Подтвердить
      .row
        .form-group.col-12.p-05
          label(for='titleRu') Русское название
          input.form-control(v-model="subCategory.titleRu" type='text' name='titleRu' id="titleRu" placeholder='Название на Русском языке')
        .form-group.col-12.p-05
          label(for='titleUa') Украинское название
          input.form-control(v-model="subCategory.titleUa" type='text' name='titleUa' id="titleUa" placeholder='Название на Украинском языке')
        .form-group.col-12.p-05
          label(for='titleEn') Английское название
          input.form-control(v-model="subCategory.titleEn" type='text' name='titleEn' id="titlEn" placeholder='Название на Английском языке')
      h4.p-05.color-blue Характеристики
      .characteristics.bg-light
        .characteristic.row.border-b.border-t.border-blue.bg-blue-01.mb-03(v-for="(char, index) in subCategory.characteristics")
          .form-group.col-6.p-1
            .color-blue.mb-03 Тип
            select.w-100.fs-1(v-model="char.type" @change="typeSelect(index)")
              option(value="null") Не выбран
              option(value="text")  Текст
              option(value="select") Выбор из списка
              option(value="chekbox") Отметить выбранное
          .pt-2.ml-auto.mr-1
            button.btn.btn-outline-danger(@click="deleteChar(index)") Удалить
          .form-group.col-6.p-1(v-if="char.name !== undefined")
            .color-blue.mb-03 Названи
            input(type="text" name="charName" v-model="char.name" placeholder="Введите название для характеристики")
          .form-group.col-6.p-1(v-if="char.suffix !== undefined")
            .color-blue.mb-03 Суффикс
            input(type="text" name="charName" v-model="char.suffix" placeholder="Приставка. Справа от основного текста.")
          .col-12.form-group.p-1(v-if="char.title !== undefined")
            label.color-blue(:for="`input-${index}`") Уникалное название на английском
            input(:id="`input-${index}`" type="text" name="charTitle" v-model="char.title" placeholder="Тут нужен уникальнй ключь") 
          //- TEXT
          .col-12.p-1(v-if="char.type === 'text'")
            .row
              .form-group.col-2.px-1
                label(:for="'minLength'+index") Минимальная длина
                input(type="text" :id="`minLength${index}`" name="minLength" v-model="char.minLength")
              .form-group.col-2.px-1
                label(:for="`maxLength${index}`") Максимальная длина
                input(type="text" :id="`maxLength${index}`" name="minLength" v-model="char.maxLength")
              .form-group.col-2.px-1.pt-2
                .switcher
                  input.d-none(
                    type="checkbox"
                    true-value="true"
                    false-value="false"
                    :id="`switch-${index}`"
                    v-model="char.onlyNumber"
                  )
                  label.switch(:for="`switch-${index}`")
                    span Только числа
          //- SELECT
          .col-12.p-1(v-if="char.type === 'select'")
            .selects.row 
              // кастыль для отображения списка
              .d-none {{killX}}
              // кастыль для отображения списка
              .col-6.pr-1
                .color-blue.mb-03 Список
                .row.color-gray
                  .col-6 Название
                  .col-6.pl-03 Значение
                .form-group.row.mb-05(v-for="(option, i) in subCategory.characteristics[index].options" :key="i")
                  .col-6.pr-03
                    input.w-100(v-model="option.title" placeholder="Первый этаж")
                  .col-6.pl-03                  
                    input.w-100(v-model="option.value" placeholder="1")
                button.btn.btn-outline-success.w-100.bg-white(@click="addOption(index)") Добавить опцию
          //- CHEKBOX
          .col-12.p-1(v-if="char.type === 'chekbox'")
            .chekboxes.row
              .form-group.col-12
                label(:for="`textarea-${index}`") 
                  span Список ключевых слов
                  span.color-gray.ml-03 (Через запятую)
                textarea.w-100(:id="`textarea-${index}`" v-model="char.list" placeholder="Кот, В галошах, Без цензуры, Смотреть онлайн")
      .row
        .col-12.p-05
          button.btn.btn-outline-blue.w-100(@click="addChar") Добавить характеристику
</template>

<script>
export default {
  props: ['editSubCategory', 'toggleModalEditSubCategory', 'updateCategories'],
  data() {return{
    subCategory: this.$store.getters['OLZ/Categories/getOneSubCategory'](this.editSubCategory.category, this.editSubCategory.subCategory),
    killX: null
  }},
  methods: {
    addChar() { this.subCategory.characteristics.push({ type: null }) },
    deleteChar(index) { this.subCategory.characteristics = this.subCategory.characteristics.filter((char, i) => i != index )},
    typeSelect(index) {
      this.subCategory.characteristics[index].name = ''
      this.subCategory.characteristics[index].suffix = ''
      this.subCategory.characteristics[index].title = ''

      switch (this.subCategory.characteristics[index].type) {
        case 'text':
          this.subCategory.characteristics[index].minLength = 0
          this.subCategory.characteristics[index].maxLength = 3
          this.subCategory.characteristics[index].onlyNumber = false
          break
        
        case 'select':
          this.subCategory.characteristics[index].options = [{
            title: '', value: ''
          }]
          break
        case 'chekbox':
          this.subCategory.characteristics[index].list = ''
          break        
        case 'null':
          this.subCategory.characteristics[index].type = null
          this.subCategory.characteristics[index].name = undefined
          this.subCategory.characteristics[index].suffix = undefined
          this.subCategory.characteristics[index].title = undefined
          break
      }
    },
    addOption(index) {
      this.subCategory.characteristics[index].options.push({
        title: '', value: ''
      })
      this.killX ++
    },
    update() {
      this.updateCategories()
      this.subCategory = {...this.$store.getters['OLZ/Categories/getOneSubCategory'](this.editSubCategory.category, this.editSubCategory.subCategory)}
    },
    saveChanges() {
      this.$store.dispatch('OLZ/Categories/changeSubCategory', {
        subCategory: {
          ...this.subCategory,
          characteristics: this.subCategory.characteristics.filter(char => char.type !== null)
        }, 
        notify: this.$notify, 
        update: this.update
      })
    },
    confirm() {
      this.$store.dispatch('OLZ/Categories/confirmSubCategory', {
        id: this.subCategory._id, 
        notify: this.$notify, 
        update: this.update
      })
    }
  }
}
</script>