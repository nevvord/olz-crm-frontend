<template lang="pug">
div
    div(v-if="calls")
        div(v-for="(call, index) in calls" :key="index")
            div {{index}} : {{call.contentJson}}
    div(v-else) else
</template>

<script>
export default {
    middleware: 'ZvoniloGetCalls',
    // async beforeCreate() {
    //     this.calls = await this.$store.getters['zvonilo/getData']
    // },
    // async beforeMount(){
    //     await this.$store.dispatch('zvonilo/getCalls')
    //     this.calls = await this.$store.getters['zvonilo/getData']
        
    // },
    data() {return{
        calls: this.$store.getters['zvonilo/getData']
    }}
}
</script>

<style lang="scss" scoped>

</style>