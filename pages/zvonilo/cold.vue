<template lang="pug">
div
  Modal(
      :closeModal="closeModal"
      :reminderIndex="reminderIndex"
      :changeCalls="changeCalls"
      v-if="showModal"
  )
  .px-2.pt-4(v-if="calls")
    .table.bg-white.bs
      .table-title Все добавленные
      .t-list(
        v-for="(call, index) in calls"
        :key="index"
        v-if="call.type === 2"
        @dblclick="openModal(call, index)"
        )
        .row
          .col-3
            .row
              .col-6
                .element
                  .p-05
                    .title Номер телефона 
                    .content {{ call.phone }}
              .col-6
                .element
                  .p-05
                    .title Дата
                    .content {{ call.date | formatDate}}
          .col-2
            .element
              .p-05
                .title Имя
                .content {{ call.name }}
          .col-1
            .element
              .p-05
                .title Группа
                .content {{ call.group }}
          .col-2
            .element
              .p-05
                .title Напоминание
                .content {{ call.reminder | formatDate }}
          .col-4
            .row
              .col-5
                .element.text-center
                  button.btn.btn-outline-success(v-if="call.status === 1")
                    span.icon.icon-User
                    span.ml-05 Unique
                  button.btn.btn-outline-warning(v-if="call.status === 2")
                    span.icon.icon-Anchor
                    span.ml-05 Hook
                  button.btn.btn-outline-danger(v-if="call.status === 3")
                    span.icon.icon-Goto
                    span.ml-05 Hell
              .col-3
                .element.text-center
                  button.btn.btn-danger(v-if="call.type === 1") hot
                  button.btn.btn-blue(v-if="call.type === 2") cold
                  button.btn.btn-dark(v-if="call.type === 3") new
              .col-4
                .element.ml-auto.text-right
                  button.btn.btn-warning(@click="openModal(call, index)") Работать
    .d-flex.mt-1
      .m-0auto
        button.btn.btn-white(@click="getMoreCalls") Загрузить еще
  div(v-else) Загрузка звонков неуспешна
</template>
<script>
import Modal from '~/components/Zvonilo/Modal/'
import StatusViewer from '~/components/Zvonilo/StatusViewer'
export default {
  middleware: 'zvonilo/getCold',
  components: {
    Modal,
    StatusViewer
  },
  data() {
    return {
      calls: this.$store.getters['zvonilo/getData'],
      call: '',
      showModal: false,
      reminderIndex: null
    }
  },
  methods: {
    openModal(call, index) {
      this.call = call
      this.showModal = true
      this.reminderIndex = index
    },
    closeModal() {
      this.showModal = false
    },
    changeReminder(date) {
      this.calls[this.reminderIndex].reminder = date
    },
    changeCalls(id) {
      this.calls = this.calls.filter(call => call._id !== id)
    },
    async getMoreCalls() {
      await this.$store.dispatch('zvonilo/updateCallsAndMerge', {vm: this, type: "cold"})
      this.calls = this.$store.getters['zvonilo/getData']
    }
  }
}
</script>

<style lang="scss" scoped>
.element {
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
  padding: .3rem;
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