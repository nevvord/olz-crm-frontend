<template lang="pug">
  .items
    nuxt-link.item(to="/admin/users" exact-active-class="activeSideBar")
      span.icon.icon-User.mr-03
      span Пользователи
</template>