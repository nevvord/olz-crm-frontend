<template lang="pug">
div
  .modal
    .modal-bg(@click="toggleModalSubcategory")
    .modal-body.modal-body-lg
      .row
        h3.color-blue.p-1.col-6 {{nameAddSubcategory}}
        .col-6.text-right.p-05
          button.btn.btn-outline-success(@click="addSubCategory") Добавить
      .form-group.p-1
        label(for="titleEn") Английское название
        input(id="titleEn" type="text" name="EnglishTitle" v-model="form.titleEn")
      .form-group.p-1
        label(for="titleRu") Русское название
        input(id="titleRu" type="text" name="RussianTitle" v-model="form.titleRu")
      .form-group.p-1
        label(for="titleUa") Украинское название
        input(id="titleUa" type="text" name="UkrainianTitle" v-model="form.titleUa")
      h4.color-blue.pl-1.pb-05 Характеристики
      .characteristics.bg-light
        .characteristic.row.border-b.border-t.border-blue.bg-blue-01.mb-03(v-for="(char, index) in form.characteristics")
          .form-group.col-6.p-1
            .color-blue.mb-03 Тип
            select.w-100.fs-1(v-model="char.type" @change="typeSelect(index)")
              option(value="null") Не выбран
              option(value="text") Текст
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
                label.switcher(:for="`required${index}`") Обязательно
                input.d-none(
                  type="checkbox"
                  true-value="true"
                  false-value="false"
                  onChange="nevviSwitch(event)"
                  v-model="char.required"
                  :id="`required${index}`"
                )
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
                .form-group.row.mb-05(v-for="(option, i) in char.options" :key="i")
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
      .p-1
        button.btn.btn-outline-blue.w-100(@click="addChar") Добавить характеристику



</template>

<script>
export default {
  props: ['toggleModalSubcategory', 'idAddSubCategory', 'nameAddSubcategory'],
  data() {return{
    form: {
      titleEn: null,
      titleRu: null,
      titleUa: null,
      characteristics: []
    },
    killX: null
  }},
  methods: {
    addChar() { this.form.characteristics.push({ type: null }) },
    deleteChar(index) { this.form.characteristics = this.form.characteristics.filter((char, i) => i != index )},
    typeSelect(index) {
      this.form.characteristics[index].name = ''
      this.form.characteristics[index].suffix = ''
      this.form.characteristics[index].title = ''

      switch (this.form.characteristics[index].type) {
        case 'text':
          this.form.characteristics[index].minLength = 0
          this.form.characteristics[index].maxLength = 3
          this.form.characteristics[index].required = false
          break
        
        case 'select':
          this.form.characteristics[index].options = [{
            title: '', value: ''
          }]
          break
        case 'chekbox':
          this.form.characteristics[index].list = ''
          break        
        case 'null':
          this.form.characteristics[index].type = null
          this.form.characteristics[index].name = undefined
          this.form.characteristics[index].suffix = undefined
          this.form.characteristics[index].title = undefined
          break
      }
    },
    addOption(index) {
      this.form.characteristics[index].options.push({
        title: '', value: ''
      })
      this.killX ++
    },
    addSubCategory() {
      const form = {
        ...this.form,
        characteristics: this.form.characteristics.filter(char => char.type !== null),
        category: this.idAddSubCategory
      }
      this.toggleModalSubcategory()
      this.$store.dispatch('OLZ/Categories/addSubCategory', { form, notify: this.$notify })
    }
  }
}
</script>