<template lang="pug">
.sidebar
    ZvoniloContent(v-if="$store.state.sideBar._BAR === 'zvonilo'")            
    Olz(v-if="$store.state.sideBar._BAR === 'olz'")       
    Admin(v-if="$store.state.sideBar._BAR === 'admin'")       
</template>

<script>
import ZvoniloContent from './items/Zvonilo'
import Olz from './items/Olz'
import Admin from './items/Admin'
export default {
    components: {
        ZvoniloContent,
        Olz,
        Admin
    },
    beforeCreate() {
        if (!this.$store.state.sideBar._BAR) {
            let curentBar = this.$route.path.split('/')[1]
            this.$store.dispatch('sideBar/changeBar', curentBar)
        }
    }
}
</script>

<style lang="scss">
.sidebar {
  z-index: 99;
  position: relative;
  box-shadow: 2px 0 10px #00000080;
  background-color: #8c2649;

  .activeSideBar {
    background-color: #f1f1f120;
    box-shadow: inset -2px 0 rgb(41, 121, 226);
  }

  .items {
    .item {
      display: block;
      padding: .5rem .7rem .5rem .5rem;
      cursor: pointer;
      color: white;
      transition: .3s;

      &:hover {
        background-color: #f1f1f120;
        padding: .5rem .5rem .5rem .7rem;
      }
    }
  }
}
</style>