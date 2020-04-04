<template lang="pug">
div
    Modal(:call="call" v-if="showModal")
    .px-2.pt-4
        .table.bg-white.bs-d(v-if="calls")
            .table-title Новые добавленные
            .row.display-flex(v-for="(call, index) in calls" :key="index")
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
                .element.ml-auto
                    .btn-warning(@click="openModal(call)") Работать
        div(v-else) Загрузка звонков неуспешна
</template>
<script>
import Modal from '~/components/Zvonilo/Modal'
export default {
    middleware: 'ZvoniloGetCalls',
    components: {
        Modal
    },
    data() {return{
        calls: this.$store.getters['zvonilo/getData'],
        call: '',
        showModal: false
    }},
    methods: {
        openModal(call) {
            this.call = call
            this.showModal = true
        }
    }
}
</script>

<style lang="scss">
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