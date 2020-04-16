<template lang="pug">
div
    Modal(
        :closeModal="closeModal"
        :reminderIndex="reminderIndex"
        :changeCalls="changeCalls"
        v-if="showModal"
    )
    .px-2.pt-4
        .table.bg-white.bs(v-if="calls")
            .table-title Все добавленные
            .row(v-for="(call, index) in calls" :key="index")
                .element
                    .title Номер телефона 
                    .content {{ call.phone }}
                .element
                    .title Дата
                    .content {{ call.date | formatDate}}
                .element
                    .title Имя
                    .content {{ call.name }}
                .element
                    .title Группа
                    .content {{ call.group }}
                .element
                    .title Напоминание
                    .content {{ call.reminder | formatDate }}
                .element
                    StatusViewer.content(:status="call.status")
                .element
                    .p-05.bs.border-radius.text-center(:class="{'bg-black': call.type === 3, 'bg-danger': call.type === 1, 'bg-blue': call.type === 2}")
                        .color-white(v-if="call.type === 3") new
                        .color-white(v-if="call.type === 1") hot
                        .color-white(v-if="call.type === 2") cold
                .element.ml-auto
                    .btn-warning(@click="openModal(call, index)") Работать
        div(v-else) Загрузка звонков неуспешна
</template>
<script>
import Modal from '~/components/Zvonilo/Modal/'
import StatusViewer from '~/components/Zvonilo/StatusViewer'
export default {
    middleware: 'ZvoniloGetCalls',
    components: {
        Modal,
        StatusViewer
    },
    data() {return{
        calls: this.$store.getters['zvonilo/getData'],
        call: '',
        showModal: false,
        reminderIndex: null
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
        }
    }
}
</script>

<style lang="scss">
.row {
    display: grid;
    grid-template-columns:  1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.element {
    position: relative;
    margin-right: 1rem;
    padding-right: .5rem;
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
</style>