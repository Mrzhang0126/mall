<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item, index) in getCartList"
                        :key="index"
                        :product="item"/>
      </scroll>
    </div>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";

  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['getCartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);

    /*第二种方法*/
    /*position: absolute;*/
    /*height: calc(100% - 44px);*/
  }

  .content {
    height: 100%;
    overflow: hidden;

    /*第二种方法*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*overflow: hidden;*/
  }
</style>
