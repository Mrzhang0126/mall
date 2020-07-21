<template>
  <div class="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive"><slot name="item-icon"></slot></div>
    <div class="item-icon-active" v-show="isActive"><slot name="item-icon-active"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
      name: "TabBarItem",
      props: {
        link: {
          type: String,
          require: true
        },
        activeColor: {
          type: String,
          default: 'red'
        }
      },
      computed: {
        isActive() {
          return this.$route.path.indexOf(this.link) !== -1
        },
        activeStyle() {
          return this.isActive ? {color: this.activeColor} : {}
        }
      },
      methods: {
        itemClick() {
          if(this.$route.path !== this.link) {
            this.$router.replace(this.link)
          }
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
  }

  .item-icon img, .item-icon-active img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }

  .item-text {
    font-size: 12px;
    margin-top: 3px;
    color: #333;
  }
</style>
