<template>
    <div class="bottom-bar">
      <span class="check-content">
        <check-button class="check-button"
                      @click.native="checkedAll"
                      :is-checked="isSelectAll"/>
        <span class="text">全选</span>
      </span>

      <span class="price">合计:{{totalPrice}}</span>
      <span class="calculate">去计算({{checkedLength}})</span>

    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['getCartListLength', 'getCartList']),
      totalPrice() {
        return '¥ ' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return item.price * item.count + preValue
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).length
      },

      isSelectAll() {
        if(this.getCartListLength === 0) return false

        //1.filter
        //return !(this.getCartList.filter(item => !item.checked).length)

        //2.find
        //return !this.getCartList.find(item => !item.checked)

        //for
        for(let item of this.getCartList) {
          if(!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkedAll() {
        if(this.isSelectAll) {
          this.getCartList.forEach(item => item.checked = false)
        } else {
          this.getCartList.forEach(item => item.checked = true)
        }
      },

    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;

    background-color: var(--color-tint);
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .price {
    height: 40px;
    line-height: 40px;
    margin-left: 20px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background: red;
    padding: 12px;
    text-align: center;
    color: #fff;
  }
</style>
