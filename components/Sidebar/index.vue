<template lang="pug">
.sidebar
    ZvoniloContent(v-if="$route.name === 'zvonilo'")
    
            
</template>

<script>
import ZvoniloContent from './items/Zvonilo'
export default {
    components: {
        ZvoniloContent
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    z-index: 99;
    position: relative;
    box-shadow: 2px 0 10px #00000080;
    background-color: #8c2649;
}
</style>