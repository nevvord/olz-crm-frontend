<template lang="pug">
div
  .px-2.pt-4
    .table.bg-white.bs(v-if="baskets")
      .table-title Корзина
      .row(v-for="(basket, index) in baskets" :key="index")
        .element
          .title Номер телефона 
          .content {{ basket.phone }}
        .element
          .title Дата
          .content {{ basket.date | formatDate}}
        .element
          .title Имя
          .content {{ basket.name }}
        .element
          .title Группа
          .content {{ basket.group }}
        .element
          .title Напоминание
          .content {{ basket.reminder | formatDate }}
        .element
          StatusViewer.content(:status="basket.status")
        .element
          .p-05.bs.border-radius.text-center(:class="{'bg-black': basket.type === 3, 'bg-danger': basket.type === 1, 'bg-blue': basket.type === 2}")
              .color-white(v-if="basket.type === 3") new
              .color-white(v-if="basket.type === 1") hot
              .color-white(v-if="basket.type === 2") cold
        .element.ml-auto.display-flex
          .btn-danger.color-white.mr-05(@click="del(basket._id)") Удалить
          .btn-success.color-white(@click="reestablish(basket)") Восстановить
    div(v-else) Загрузка звонков неуспешна
</template>

<script>
import StatusViewer from '~/components/Zvonilo/StatusViewer'
export default {
  components: {
    StatusViewer
  },
  data: () => ({
    baskets: null
  }),
  beforeCreate() {
    this.$axios
      .get('/zvonilo/getbaskets')
      .then(({data}) => {
        this.baskets = data.calls
      })
      .catch(error => {
        console.error(error)
      })
  },
  methods: {
    del(id) {
      this.$axios
        .delete(`/zvonilo/delete/callbasket/${id}`)
        .then(({ data }) => {
          this.baskets = this.baskets.filter(basket => basket._id !== id)
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
    },
    reestablish(basketCall) {
      this.$axios
        .post(`/zvonilo/addnewcall`, {phone: basketCall.phone})
        .then(({ data }) => {
          this.baskets = this.baskets.filter(basket => basket._id !== basketCall._id)
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

<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
}
.element {
  position: relative;
  margin-right: 1rem;

  .title {
    font-size: .6rem;
    color: #777;
  }

  .content {
    font-size: .8rem;
  }
}
</style>