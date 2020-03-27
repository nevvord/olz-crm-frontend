<template lang="pug">
div
  div(v-if="show") {{text}}
  button(@click="show = !show") Show
</template>

<script>
  export default {
    data: () => ({
      show: false,
      text: "Text"
    })
  }
</script>

<style lang="scss" scoped>
.container {
  margin-left: 10%;
  margin-right: 10%;
}

</style>