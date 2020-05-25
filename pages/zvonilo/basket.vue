<template lang="pug">
div
  .container.p-none.mt-4.bg-white.bs.br
    .table
      .table-title Корзина
    .t-list.row(v-for="(basket, index) in baskets" :key="index")
      .col-3
        .d-flex
          .element
            .title Номер телефона 
            .content {{ basket.phone }}
          .element.ml-auto
            .title Дата
            .content {{ basket.date | formatDate}}
      .col-2
        .d-flex
          .element
            .title Имя
            .content {{ basket.name }}
          .element.ml-auto
            .title Группа
            .content {{ basket.group }}
      .col-2
        .element
          .title Напоминание
          .content {{ basket.reminder | formatDate }}
      .col-5
        .d-flex 
          .element.col-3.p-none
            StatusViewer.content(:status="basket.status")
          .element.col-3.p-none
            .p-05.bs.border-radius.text-center(:class="{'bg-black': basket.type === 3, 'bg-danger': basket.type === 1, 'bg-blue': basket.type === 2}")
                .color-white(v-if="basket.type === 3") new
                .color-white(v-if="basket.type === 1") hot
                .color-white(v-if="basket.type === 2") cold
          .ml-auto.d-flex.p-03
            button.btn.btn-danger.color-white.mr-05(@click="del(basket._id)") Удалить
            button.btn.btn-success.color-white(@click="reestablish(basket)") Восстановить
  .d-flex.mt-1
    .m-0auto
      button.btn.btn-white(@click="getMoreCalls") Загрузить еще
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
      .get('/zvonilo/get/baskets/0/20')
      .then(({data}) => {
        this.baskets = data.baskets
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
    },
    async getMoreCalls() {
      const skip = this.baskets.length
      const newBaskets = await this.$axios.$get(`zvonilo/get/baskets/${skip}/20`)
      this.baskets = this.baskets.concat(newBaskets.baskets)
      this.$notify({
        group: 'foo',
        title: `Загрузка успешна`,
        text: `Загруженно еще ${newBaskets.baskets.length} клиентов`,
        type: 'info'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.element {
  padding: .3rem;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .title {
    font-size: .6rem;
    color: #777;
  }
  .content {
    font-size: .8rem;
  }
}
.table {
    position: relative;
    border-radius: 4px;
    &-title {
        position: absolute;
        top: -2rem;
        left: .2rem;
        padding: .5rem;
        background: #fff;
        border: 1px solid #00000040;
        border-radius: 2px;
    }
}
.t-list{
    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    &:nth-child(odd) {
        background: #f4f4f4;
    }
    &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-top: 1rem;
    }
    &:hover {
      background: #c1c1c1;
    }
}
</style>