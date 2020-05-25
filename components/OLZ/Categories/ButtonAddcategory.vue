<template lang="pug">
div
  .bold.cp.p-05(
    @click="toggleWindowAddCategory"
    :class="{'text-center': !windows.addCategory}"
  )
    span.color-blue Добавить Категорию
</template>

<script>
export default {
  props: ['toggleWindowAddCategory', 'windows']
}
</script>