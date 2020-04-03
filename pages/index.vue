<template lang="pug">
div
  .card Какойто текст
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

.card {
  width: 33%;
  margin: 3rem auto;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px #00000040;
}

</style>