<template lang="pug">
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
                .btn-warning Работать
    div(v-else) Загрузка звонков неуспешна
</template>

<script>
export default {
    middleware: 'ZvoniloGetCalls',
    data() {return{
        calls: this.$store.getters['zvonilo/getData']
    }}
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