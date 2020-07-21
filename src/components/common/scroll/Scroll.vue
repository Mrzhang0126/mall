<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        //probeType: 侦测
        //0,1不可以实时侦测
        //2: 只能侦测手指滑动的位置,惯性滑动不可以侦测
        //3: 只要滑动都可以侦测
        probeType: this.probeType,
        //里边点击图片跳转(如果不设为true，就会没反应)
        click: true,
        //上拉加载更多
        pullUpLoad: this.pullUpLoad
      })

      //2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          //console.log(position);
          this.$emit('scrollPos', position)
        })
      }

      //3.上拉加载更多
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

      //console.log(this.scroll);
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
        //console.log('---scroll--refresh--');
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY(index) {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
