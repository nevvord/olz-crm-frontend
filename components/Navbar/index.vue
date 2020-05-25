<template lang="pug">
.navbar
    nav
        nuxt-link.logo(to="/" @click.native="changeSideBar('')") N
        .items
            .item(v-if="access.zvonilo")
                nuxt-link(to="/zvonilo" @click.native="changeSideBar('zvonilo')" :class="{'nav-active': $store.state.sideBar._BAR === 'zvonilo'}") Звонило
            .item(v-if="access.olz")
                nuxt-link(to="/olz" @click.native="changeSideBar('olz')" :class="{'nav-active': $store.state.sideBar._BAR === 'olz'}") OLZ
            .item(v-if="access.admin")
                nuxt-link(to="/admin" @click.native="changeSideBar('admin')" :class="{'nav-active': $store.state.sideBar._BAR === 'admin'}") Администрация
        .items.ml-auto
            .item.color-white.cp.px-1.pt-05(@click="toggleDropMenu") {{$store.state.auth._USER.login}}
            .dropMenu.bg-white.br-b.bs(v-if="dropMenuShow")
                nuxt-link.px-1.py-05.d-block.color-dark.hover-light(to="/profile" @click.native="changeSideBar(''); toggleDropMenu()") Профиль
                .logout.py-05.px-1.cp.hover-light(@click="logout") Выход
                
</template>

<script>
export default {
    data: (vm = this) => ({
        data: '',
        access: vm.$store.getters['auth/getAccesses'],
        dropMenuShow: false
    }),
    methods: {
        changeSideBar(bar) {this.$store.dispatch('sideBar/changeBar', bar)},
        logout() {this.$store.dispatch('auth/logout')},
        toggleDropMenu() {this.dropMenuShow = !this.dropMenuShow}
    }
}
</script>

<style lang="scss" scoped>
.dropMenu {
    position: absolute;
    top: 2rem;
    right: 0;
    bottom: auto;
}
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
            padding: .5rem .857rem;
            background-color: #f443368f;
            font-weight: 900;
        }
        .items {
            display: flex;
            .item {
                a{
                    padding: .5rem 1rem;
                    display: block;
                    color: rgb(233, 233, 233);
                    cursor: pointer;
                    text-decoration: none;
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