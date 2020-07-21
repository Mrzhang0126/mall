<template>
  <div>
    <grid-view :cols="3" :line-space="15" v-margin="20" v-if="subcategories.list">

    </grid-view>
  </div>
</template>

<script>
  import GridView from "../../../components/common/gridView/GridView";

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
