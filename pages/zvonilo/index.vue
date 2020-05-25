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
        @dblclick="openModal(call, index)"
        :class="{'border-l-4 border-danger': call.type === 1, 'border-l-4 border-blue': call.type === 2, 'border-l-4 border-': call.type === 3, 'bs-success-inset-l': call.status === 1, 'bs-warning-inset-l': call.status === 2, 'bs-dark-inset-l': call.status === 3}"
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
            //- .row
            //-   .ml-auto.d-flex
            //-     .btn-circle.btn-blue Cold
            //-     .p-05.border-l.border-success.f-mono.hover-success.color-success(v-if="call.status === 1") Un
            //-     .p-05.border-l.border-warning.f-mono.hover-warning.color-warning(v-if="call.status === 2") Hk
            //-     .p-05.border-l.border-danger.f-mono.hover-danger.color-danger(v-if="call.status === 3") Hl
            //-     .p-05.border-l.border-danger.f-mono.hover-danger.color-danger(v-if="call.type === 1") Ht
            //-     .p-05.border-l.border-blue.f-mono.hover-blue.color-blue(v-if="call.type === 2") Cd
            //-     .p-05.border-l.border-success.f-mono.hover-success.color-success(v-if="call.type === 3") Nw
            //-     .p-05.border-l.border-b.border-r.bg-warning.br.cp.border-t Работать
            .row
              .col-5
                .element.text-center.p-03
                  button.btn.btn-outline-success(v-if="call.status === 1" @click="changeShowStatus(1)")
                    span.icon.icon-User
                    span.ml-05 Unique
                  button.btn.btn-outline-warning(v-if="call.status === 2" @click="changeShowStatus(2)")
                    span.icon.icon-Anchor
                    span.ml-05 Hook
                  button.btn.btn-outline-danger(v-if="call.status === 3" @click="changeShowStatus(3)")
                    span.icon.icon-Goto
                    span.ml-05 Hell
                  //- StatusViewer(:status="call.status")
              .col-3
                .element.text-center.p-03
                  button.btn.btn-danger(v-if="call.type === 1") hot
                  button.btn.btn-blue(v-if="call.type === 2") cold
                  button.btn.btn-dark(v-if="call.type === 3") new
              .col-4
                .element.ml-auto.text-right.p-03
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
    middleware: 'zvonilo/getAll',
    components: {
        Modal,
        StatusViewer
    },
    data() {return{
        calls: this.$store.getters['zvonilo/getData'],
        call: '',
        showModal: false,
        reminderIndex: null,
        showStatus: null
    }},
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
      changeShowStatus(status) {
        this.showStatus = status
      },
      async getMoreCalls() {
        await this.$store.dispatch('zvonilo/updateCallsAndMerge', { vm: this, type: "all" })
        this.calls = this.$store.getters['zvonilo/getData']
      }
    }
}
</script>


<style lang="scss">
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
    &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-top: 1rem;
    }
    &:nth-child(odd) {
        background: #f4f4f4;
    }
    &:hover {
      background: #dbdbdb;
    }
}
</style>