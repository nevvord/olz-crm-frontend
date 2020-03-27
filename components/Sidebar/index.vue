<template lang="pug">
.sidebar
    .items
            
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.sidebar {
    background-color: #9fb4c5;
    .items {
        .item {
            padding: .5rem;
            cursor: pointer;
            color: white;
            // font-weight: 100;
            &:hover {
                background-color: #f1f1f120;
            }
        }
    }
}
</style>