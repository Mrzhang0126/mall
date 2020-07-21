<template>
   <div class="cart">
<!--     --购物车(导航栏)-->
     <nav-bar class="cart-nav-bar">
       <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>

<!--     商品列表-->
     <cart-list/>

     <cart-bottom-bar/>
   </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";

  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import { mapGetters } from 'vuex'
  export default {
    name: "ShopCart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // cartLength() {
      //   return this.$store.state.cartList.length
      // }

      //两种方式:
      //1.数组模式
      //...mapGetters(['getCartListLength','getCartList'])

      //2.对象模式(可以自己定义名字)
      ...mapGetters({
        cartLength: 'getCartListLength',
        list: 'getCartList'
      })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .cart-nav-bar {
    background: var(--color-tint);
    color: #fff;
    text-align: center;
    /*font-weight: 800;*/
  }
</style>
