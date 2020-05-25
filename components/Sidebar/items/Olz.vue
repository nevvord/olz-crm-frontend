<template lang="pug">
.items
  nuxt-link.item(to="/olz/categories" exact-active-class="activeSideBar")
    span.icon.icon-Cassette.mr-03
    span(v-if="toggles.textHidde") Категории
  .item(@click="tooglePublication")
    span.mr-03.icon.icon-Web
    span(v-if="toggles.textHidde") Публикации
  .togglePublications.items.bg-instagram.bs-inset(v-if="toggles.publications")
    nuxt-link.item(to="/olz/publications/moderate" exact-active-class="activeSideBar") Модерауция
    nuxt-link.item(to="/olz/publications" exact-active-class="activeSideBar") Все публикации
    nuxt-link.item(to="/olz/publications/add" exact-active-class="activeSideBar") Добавить

  nuxt-link.item(to="/olz/users" exact-active-class="activeSideBar") 
    span.icon.icon-Users.mr-03
    span(v-if="toggles.textHidde") Пользователи
  .item.mt-auto(@click="hideText")
    span.icon.icon-Rolodex.mr-03
    span(v-if="toggles.textHidde") Спрятать
</template>

<script>
export default {
  data() {return{
    toggles: {
      publications: false,
      textHidde: false
    },
  }},
  beforeMount() {
    this.toggles.textHidde = localStorage.getItem('sideBarTextHidden')
    console.log(this.toggles.textHidde);
    console.log(localStorage.getItem('sideBarTextHidden'));
    
    
  },
  methods: {
    tooglePublication() {this.toggles.publications = !this.toggles.publications},
    hideText() {
      this.toggles.textHidde = !this.toggles.textHidde
      localStorage.setItem('sideBarTextHidden', this.toggles.textHidde)
    }
  }
}
</script>