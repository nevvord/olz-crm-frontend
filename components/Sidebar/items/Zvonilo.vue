<template lang="pug">
.items
    .item Поступишие
    .item Горячие
    .item Холодные
    .item Корзина
    .item Добавить нового
  
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.items {
  .item {
    padding: .5rem .7rem .5rem .5rem;
    cursor: pointer;
    color: white;
    transition: .3s;
    
    &:hover {
      background-color: #f1f1f120;
      padding: .5rem .5rem .5rem .7rem;
    }
  }
}
</style>