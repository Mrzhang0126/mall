<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control class="tab-control"
                   :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   v-show="isTabControlFixed"/>

      <scroll class="scroll"
              ref="scroll"
              :probe-type="3"
              @scrollPos="scrollPos"
              :pull-up-load="true"
              @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control class="tab-control2"
                     :titles="['流行', '新款', '精选']"
                     @tabClick="tabClick"
                     ref="tabControl2" />
<!--                 :class="{fixed: isTabControlFixed}"/>-->
        <goods-list :goods-list="showGoods"/>
      </scroll>

<!--      或者把该组件包裹在div里面-->
      <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from '../../common/utils'

  import {goodsItemListenerMixin} from "../../common/mixin";
  import {BACKTOP_DISTANCE} from "../../common/const";

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabControlFixed: false,
        saveY: 0,
        //itemImageListener: null //监听$bus的回调函数(用于判断图片加载完成)
      }
    },
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

      HomeSwiper,
      RecommendView,
      FeatureView
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mixins: [goodsItemListenerMixin],
    destroyed() {
      console.log('destoryed');
    },
    activated() {
      //先refersh
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY(this.currentType)
      //console.log(this.saveY);
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //如果有时间用 vuex 写一下
      //1.监听GoodsListItem中的图片加载完成
      //const refresh = debounce(this.$refs.scroll.refresh)
      // this.$bus.$on('homeItemImageLoad', () => {
      //   refresh()
      // })

      // const refresh = debounce(this.$refs.scroll.refresh)
      // this.itemImageListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImageListener)

      //2.获取tabControl的offsetTop
      //所有的组件都有一个$el: 用于获取元素
      //console.log(this.$refs.tabControl.$el.offsetTop);
      //console.log('home mounted');
    },
    methods: {
      /**
       *  事件监听相关办法
       * */
      tabClick(index) {
        //console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
             break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      scrollPos(position) {
        //1.判断backTop是否显示
        this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
        //this.listenerShowBackTop(position)

        //2.滚动时tabControl是否吸顶(position: fixed)
        this.isTabControlFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      //防抖函数(解决多次调用,减小服务器压力)
      //还有一个节流函数throttle(有空学习一下)
      // debounce(func, delay = 200) {
      //   let timer = null
      //   return function (...args) {
      //     if(timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this, args)
      //     }, delay)
      //   }
      // },

      /**
       *  网络请求相关方法
       * */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    updated() {
      // if(this.isUpdate) {
      //   console.log(this.$refs.tabControl.$el.offsetTop);
      //   this.isUpdate = false
      // }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    text-align: center;
    color: white;
    background-color: var(--color-tint);

    /*在使用浏览器原生滚动时,为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*吸顶属性*/
  .tab-control {
    /*position: sticky;*/
    /*top: 44px;*/
    position: relative;
    z-index: 9;
  }

  .scroll {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.scroll {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/

  /*.fixed {*/
  /*  position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44px;*/
  /*}*/
</style>
