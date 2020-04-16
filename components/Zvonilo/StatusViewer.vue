<template lang="pug">
.View-Satus
  .new.bg-success.text-center.border-radius.color-light.p-05.bs(v-if="status === 1")
    span.icon.icon-User
    span.ml-05 Unique
  .hook.bg-warning.text-center.border-radius.color-dark.p-05.bs(v-if="status === 2") 
    span.icon.icon-Anchor
    span.ml-05 Hook
  .heal.bg-danger.text-center.border-radius.color-light.p-05.bs(v-if="status === 3") 
    span.icon.icon-Goto
    span.ml-05 Hell
</template>

<script>
export default {
  props: ['status']    
}
</script>