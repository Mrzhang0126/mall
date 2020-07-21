<template>
    <div class="check-button">
      <img class="img" src="../../../assets/img/cart/tick.svg"
           :class="{checked: isChecked}"
           @click="checkClick">
    </div>
</template>

<script>
    export default {
      name: "CheckButton",
      props: {
        isChecked: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        checkClick() {
          this.$emit('checkBtnClick')
        }
      }
    }
</script>

<style scoped>
  .img {
    border-radius: 80%;
    border: 2px solid #aaa;
  }

  .checked {
    border-color: red;
    background-color: red;
  }
</style>
