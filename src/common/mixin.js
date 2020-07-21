import {debounce} from "./utils";

import {BACKTOP_DISTANCE} from "./const";
import BackTop from "../components/content/backTop/BackTop";

import {POP, SELL, NEW} from './const'

export const goodsItemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refreshResources: null
    }
  },
  mounted() {
    //const refresh = debounce(this.$refs.scroll.refresh)
    this.refreshResources = debounce(this.$refs.scroll.refresh)
    this.itemImageListener = () => {
      //refresh()
      this.refreshResources()
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)

    //console.log('我是混入中的方法mounted');
  }
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
      console.log('============');
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
    }
  }
}

