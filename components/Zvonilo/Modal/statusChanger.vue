<template lang="pug">
.status.display-flex.p-1.bg-light.border-radius.mb-1.bs(
  :class="{'border border-blue': status === 1, 'border border-orange': status === 2, 'border border-danger': status === 3}"
  v-if="status"
)
  .status-pick.py-05.px-1.color-white.bg-blue-05(
    :class="{'bg-blue bs': status === 1}"
    @click="pickStatus(1)"
  )
    div Уникальный
  .status-pick.py-05.px-1.bg-warning-05.color-gray(
    :class="{'bg-warning bs': status === 2}"
    @click="pickStatus(2)"
  )
    div На крючке
  .status-pick.py-05.px-1.bg-danger-05.color-white(
    :class="{'bg-danger bs': status === 3}"
    @click="pickStatus(3)"
  )
    div Из преисподней
</template>

<script>
export default {
  props: ['index', 'id'],
  data() {return{
    status: this.$store.getters['zvonilo/getOneStatus'](this.index)
  }},
  methods: {
    pickStatus(status) {
      this.$axios
        .put(`/zvonilo/changestatus/${this.id}`, {status})
        .then(({data}) => {
          this.$store.dispatch('zvonilo/changeStatus', { index: this.index, status })
          this.status = status
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
    },  
  }
}
</script>

<style lang="scss" scoped>

</style>