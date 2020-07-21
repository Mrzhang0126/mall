import Toast from "./Toast";

const object = {}

object.install = function (Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor()

  //3.将组建对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  //5.挂载到Vue实例
  Vue.prototype.$toast = toast

}

export default object

