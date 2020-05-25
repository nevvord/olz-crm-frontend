<template lang="pug">
.type.d-flex.p-1.bg-light.border-radius.mb-1.bs.bs.align-content-center
    .type-pick.py-05.px-1.color-white.bg-danger-05(
        :class="{'bg-danger bs': type === 1}"
        @click="pickType(1)"
    )
        div Горячие
    .type-pick.py-05.px-1.color-white.bg-blue-05(
        :class="{'bg-blue bs': type === 2}"
        @click="pickType(2)"
    )
        div Холодные
    .type-pick.py-05.px-1.color-white.bg-gray-05(
        :class="{'bg-gray bs': type === 3}"
        @click="pickType(3)"
    )
        div Новый
</template>

<script>
export default {
    props: ['index', 'id'],
    data() {return{
        type: this.$store.getters['zvonilo/getOneType'](this.index)
    }},
    methods: {
        pickType(type) {
            this.$axios
                .put(`/zvonilo/changetype/${this.id}`, {type})
                .then(({data}) => {
                this.$store.dispatch('zvonilo/changeType', { index: this.index, type })
                this.type = type
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