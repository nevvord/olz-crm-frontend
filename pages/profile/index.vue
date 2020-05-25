<template lang="pug">
div
  .container
    h1.mb-1 Профиль пользователя {{user.login}}
    .px-1
      .row
        .col-6
          .color-blue.bold.fs-1 Тема: 
            span.color-dark {{user.settings.styleMod}}
        .col-6
          .color-blue.bold.fs-1 Статус: 
            span.color-dark(v-if="user.mode === 0") Супер админ
            span.color-dark(v-if="user.mode === 1") Админ
            span.color-dark(v-if="user.mode === 2") Работник
            span.color-dark(v-if="user.mode === 3") Демонстарция
</template>
<script>
export default {
  data() {return{
    user: this.$store.getters['auth/getUser']
  }}
}
</script>