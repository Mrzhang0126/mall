<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"/>

    <scroll class="content" ref="scroll"  :probe-type="3" @scrollPos="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goodsInfo"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-params-info :param-info="paramsInfo" ref="params"/>
      <detail-comment-info :comment-info="commentsInfo" ref="comment"/>
      <goods-list :goodsList="recommends" ref="recommend"/>
    </scroll>

    <detail-bottom-bar @addShopCart="addToShopCart"/>

    <back-top v-show="isShowBackTop" @click.native="backTopClick"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamsInfo from "./childComps/DetailParamsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  import {goodsItemListenerMixin, backTopMixin} from "../../common/mixin";

  import {NAVBAR_HEIGHT} from "../../common/const";

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goodsInfo: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {},
        commentsInfo: {},
        recommends: [],
        // itemImageListener: null
        themeTopYs: [],
        getThemeTopY: null,
        titleIndex: 0
      }
    },
    mixins: [goodsItemListenerMixin, backTopMixin],
    created() {
      // 1.保存传入的iid
      // 1.1.用::iid获取路由
      this.iid = this.$route.params.iid
      //console.log(this.iid);
      // 1.2.用query获取路由
      //this.iid = this.$route.query.iid

      // 2.请求商品数据
      getDetail(this.iid).then(res => {
         console.log(res);
        // 2.1.获取结果
        const data = res.result

        // 2.2.获取顶部轮播图片信息
        this.topImages = data.itemInfo.topImages

        // 2.3.获取商品信息
        this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 2.4.获取店铺信息
        this.shopInfo = new Shop(data.shopInfo)
        //this.shopInfo = data.shopInfo

        // 2.5.获取商品信息
        this.detailInfo = data.detailInfo

        // 2.6.保存参数信息
        //this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        this.paramsInfo = data.itemParams

        // 2.7.保存评论信息
        if(data.rate !== 0) {
          this.commentsInfo = data.rate.list[0]
          //console.log(this.commentsInfo);
        }

        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        //
        //   console.log(this.themeTopYs);
        // })


      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      //4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)

        //console.log('111----' + this.themeTopYs);
        this.themeTopYs = this.themeTopYs.map(n => {
          if(n === 0) return 0
          return n - NAVBAR_HEIGHT
        })

        //console.log('222----' + this.themeTopYs);
      }, 200)

    },
    mounted() {
      // const refresh = debounce(this.$refs.scroll.refresh)
      // this.itemImageListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImageListener)
      //console.log('detail mounted');


    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImageListener)
    },
    methods: {
      ...mapActions(['addShopCarts']),
      detailImageLoad() {
        //图片加载完成进行scroll里面的scrollHeight刷新
        this.refreshResources()

        //
        this.getThemeTopY()
      },
      titleClick(index) {
        //console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        let positionY = -position.y
        let len = this.themeTopYs.length

        //hack做法(小技巧: 在this.themeTopYs中加入了一个最大数Number.MAX_VALUE)
        for(let i = 0; i < len -1; i++) {
          if( (this.titleIndex !== i) && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1]) ) {
            this.titleIndex = i
            this.$refs.detailNavBar.currentIndex = this.titleIndex
          }
        }

        //普通做法(条件复杂)
        // for(let i = 0; i < len; i++) {
        //   if(this.titleIndex !== i && ( (i < len - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
        //     (i === len -1 && positionY >= this.themeTopYs[i]) ) ) {
        //     console.log(i);
        //     this.titleIndex = i
        //
        //     this.$refs.detailNavBar.currentIndex = this.titleIndex
        //   }
        // }

       //判断是否回到顶部(判断backTop是否显示)
        this.listenerShowBackTop(position)

      },
      //将商品添加到购物车
      addToShopCart() {
        //console.log('addToShopCart====');
        //1.获取购物车需要展示的信息
        let product = {}
        product.image = this.topImages[0]
        product.title = this.goodsInfo.title
        product.desc = this.goodsInfo.desc
        product.price = this.goodsInfo.realPrice
        product.iid = this.iid

        //2.将商品添加到购物车
        this.addShopCarts(product).then(res => {
          //console.log(res);

          this.$toast.show(res)
        })

        //this.$store.commit('addProductObject', product)
        // this.$store.dispatch('addShopCarts', product).then(res => {
        //   console.log(res);
        //})

      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }

  /*.content {*/
  /*  overflow: hidden;*/

  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 0;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
