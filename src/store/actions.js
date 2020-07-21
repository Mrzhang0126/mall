export default {
  addShopCarts(context, payload) {

    return new Promise((resolve, reject) => {
      //1.查找数组有无该商品
      let oldProduct = context.state.cartList.find(item => {
        return payload.iid === item.iid
      })

      //2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit('addProductCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addProductObject', payload)
        resolve('添加新的商品')
      }
    })


  }
}
