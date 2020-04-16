<template lang="pug">
.sidebar
    ZvoniloContent(v-if="$store.state.sideBar._BAR === 'zvonilo'")            
</template>

<script>
import ZvoniloContent from './items/Zvonilo'
export default {
    components: {
        ZvoniloContent
    },
    beforeCreate() {
        if (!this.$store.state.sideBar._BAR) {
            const curentBar = this.$route.path.split('/')[1]
            this.$store.dispatch('sideBar/changeBar', curentBar)
        }
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