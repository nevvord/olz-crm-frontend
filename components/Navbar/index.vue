<template lang="pug">
.navbar
    nav
        nuxt-link.logo(to="/") N
        .items
            .item 
                nuxt-link(to="/zvonilo") Звонило
        .items.ml-auto 
            .item 17.06
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.navbar {
    nav {
        display: flex;
        background-color: #4b4b69;
        .logo {
            color: white; 
            padding: .5rem 1rem;
            background-color: #3f3f4f;
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