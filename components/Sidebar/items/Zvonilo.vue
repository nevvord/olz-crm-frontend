<template lang="pug">
.items
    nuxt-link.item(to="/zvonilo" exact-active-class="activeSideBar") Все клиенты
    nuxt-link.item(to="/zvonilo/hot" exact-active-class="activeSideBar") Горячие
    nuxt-link.item(to="/zvonilo/cold" exact-active-class="activeSideBar") Холодные
    nuxt-link.item(to="/zvonilo/basket" exact-active-class="activeSideBar") Корзина
    nuxt-link.item(to="/zvonilo/add" exact-active-class="activeSideBar") Добавить нового
  
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.activeSideBar{
  background-color: #f1f1f120;
  box-shadow: inset -2px 0 rgb(41, 121, 226);
}
.items {
  .item {
    display: block;
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