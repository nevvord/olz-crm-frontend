<template lang="pug">
.p-2.bg-light.border-radius.bs-d.mb-1
    .pb-1.color-gray Напоминание звонка ({{reminder | formatDate}})
    div
        input.bs-d(type="datetime-local" id="pickDate" v-model="newReminder")
        button.btn-white.ml-1(@click="remind" :disabled="!newReminder") Напомнить
</template>

<script>
export default {
    props:['index', 'id'],
    data() {return{
        reminder: this.$store.getters['zvonilo/getOneReminder'](this.index),
        newReminder: null
    }},
    methods: {
        remind() {
            this.$axios
                .post(`/zvonilo/remind/${this.id}`, { reminder: this.newReminder })
                .then(({data}) => {
                    this.$store.dispatch('zvonilo/changeReminder', { index: this.index, date: this.newReminder })
                    this.reminder = this.newReminder
                    this.$notify({
                        group: 'foo',
                        title: `Успешно!`,
                        text: data.msg,
                        type: 'success'
                    })
                })
                .catch(({response}) => {
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

</style>