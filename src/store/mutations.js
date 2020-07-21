import {ADD_PRODUCT_COUNTER, ADD_PRODUCT_OBJECT} from "./mutation-types";

export default {
  //数组常用方法? push/pop/shift/unshift/reserve/map/filter/reduce/find/join

  //添加商品数量
  // addProductCounter(state, payload) {
  //   payload.count += 1
  // },
  //
  // //添加商品
  // addProductObject(state, payload) {
  //   state.cartList.push(payload)
  // }



  //添加商品数量
  [ADD_PRODUCT_COUNTER](state, payload) {
    payload.count += 1
  },

  //添加商品
  [ADD_PRODUCT_OBJECT](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }

}
