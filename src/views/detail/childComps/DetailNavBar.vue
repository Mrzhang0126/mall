<template>
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="../../../assets/img/common/back.svg" >
    </div>
    <div slot="center" class="title">
       <div v-for="(item, index) in titles"
             class="title-item"
             :class="{active: currentIndex === index}"
             @click="itemClick(index)">
      {{item}}
    </div>
    </div>

  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index

        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  /*.nav-bar {*/
  /*  position: relative;*/
  /*  z-index: 9;*/
  /*  background-color: #fff;*/
  /*}*/

  .back img {
    margin-top: 12px;
    margin-left: 12px;
  }

  .title {
    display: flex;
    /*padding: 0 10px;*/
  }

  .title-item {
    flex: 1;
    font-size: 13px;
    text-align: center;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
