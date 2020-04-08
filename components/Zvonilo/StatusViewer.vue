<template lang="pug">
.View-Satus
  .new(v-if="status === 1") new
  .hook(v-if="status === 2") На крючьке
  .heal(v-if="status === 3") Из преисподни
</template>

<script>
export default {
  props: ['status']    
}
</script>

<style lang="scss" scoped>

</style>