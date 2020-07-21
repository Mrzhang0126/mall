import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=> import('./views/home/Home')
const Category = ()=> import('./views/category/Category')
const ShopCart = ()=> import('./views/shopcart/ShopCart')
const Profile = ()=> import('./views/profile/Profile')
const Detail = ()=> import('./views/detail/Detail')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
component: Category
},
{
  path: '/shopcart',
    component: ShopCart
},
{
  path: '/profile',
    component: Profile
},
  {
    path: '/detail/:iid',
    //path: '/detail',
    component: Detail
  }
]

export default new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})
