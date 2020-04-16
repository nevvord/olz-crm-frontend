<template lang="pug">
.navbar
    nav
        nuxt-link.logo(to="/") N
        .items
            .item 
                nuxt-link(to="/zvonilo" @click.native="changeSideBar('zvonilo')" :class="{'nav-active': $store.state.sideBar._BAR === 'zvonilo'}") Звонило
        .items.ml-auto 
            .item.p-05.color-white Тут я хочу текущую дату
</template>

<script>
export default {
    data: () => ({
        data: ''
    }),
    methods: {
        changeSideBar(bar) {
            this.$store.dispatch('sideBar/changeBar', bar)
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-active {
    box-shadow: inset 0 -2px 0 rgb(39, 94, 44);
}
.navbar {
    z-index: 100;
    position: relative;
    box-shadow: 0 0 10px #00000080;
    nav {
        display: flex;
        background-color: #1c1c3e;
        .logo {
            color: white; 
            padding: .5rem 1rem;
            background-color: #f443368f;
            font-weight: 900;
        }
        .items {
            display: flex;
            // width: 100%;
            .item {
                a{
                    display: block;
                    padding: .5rem 1rem;
                    color: rgb(233, 233, 233);
                    cursor: pointer;
                    &:hover {
                        background-color: #f1f1f120;
                    }
                }
            }
            
            // background-color: #f1f1f1;
            // width: 100%;
        }
    }
}
</style>