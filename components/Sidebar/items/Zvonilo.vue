<template lang="pug">
.items
    nuxt-link.item(to="/zvonilo" exact-active-class="activeSideBar") Все клиенты
    nuxt-link.item(to="/zvonilo/hot" exact-active-class="activeSideBar") Горячие
    nuxt-link.item(to="/zvonilo/cold" exact-active-class="activeSideBar") Холодные
    nuxt-link.item(to="/zvonilo/basket" exact-active-class="activeSideBar") Корзина
    nuxt-link.item(to="/zvonilo/add" exact-active-class="activeSideBar") Добавить нового
  
</template>