<template>
  <span class="CustomContent">
   {{customOptions}}
  </span>
</template>
<script>
export default {
  name: 'CustomContent',
  props: {
    customOptions: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" scoped>
.TextContent {
  display: inline-block;
  max-width: 400px;
  word-wrap:break-word;
  text-align: left;
}
</style>

